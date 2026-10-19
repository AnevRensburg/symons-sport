/**
 * End-to-end API tests against a throwaway database.
 * Needs a local MongoDB on 127.0.0.1:27017 (see README).
 */
import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';

process.env.MONGO_URL = 'mongodb://127.0.0.1:27017/test_symons';
process.env.AUTH_RATE_LIMIT = '1000'; // the tests sign in far more often than a person would

const { default: mongoose } = await import('mongoose');
const { default: request } = await import('supertest');
const { default: bcrypt } = await import('bcryptjs');
const { createApp } = await import('../src/app.ts');
const { DealerModel, UserModel } = await import('../src/models.ts');
const { toTel } = await import('../src/regions.ts');

const app = createApp();
const auth = (token: string) => ({ Authorization: `Bearer ${token}` });
let token = '';

before(async () => {
  await mongoose.connect(process.env.MONGO_URL!);
  await mongoose.connection.db!.dropDatabase();
  await UserModel.init();
  await UserModel.create({ email: 'owner@x.test', name: 'Owner', passwordHash: await bcrypt.hash('temp-password', 4), mustChangePassword: true });
  await DealerModel.create([
    { name: 'Zeta Motors', region: 'gauteng', phone: '011 000 0000', tel: '+27110000000' },
    { name: 'Alpha Bikes', region: 'gauteng', phone: '011 111 1111', tel: '+27111111111', address: '1 Main Rd' },
    { name: 'CORPCLO', region: 'zimbabwe', phone: '+02 63 7722 68971', tel: '+263772268971' },
  ]);
});

after(async () => {
  await mongoose.connection.db!.dropDatabase();
  await mongoose.disconnect();
});

test('tel: links are worked out from the displayed number', () => {
  assert.equal(toTel('021 975 9629'), '+27219759629');
  assert.equal(toTel('012 271 0070/1'), '+27122710070');
  assert.equal(toTel('+02 63 7722 68971'), '+263772268971');
  assert.equal(toTel('+264 61 123 456'), '+26461123456');
});

test('the public list groups dealers by region, sorted by name, without empty regions', async () => {
  const res = await request(app).get('/api/dealers').expect(200);
  assert.equal(res.headers['cache-control'], 'no-cache');
  assert.deepEqual(res.body.map((r: { id: string }) => r.id), ['gauteng', 'zimbabwe']);
  assert.deepEqual(res.body[0].dealers.map((d: { name: string }) => d.name), ['Alpha Bikes', 'Zeta Motors']);
  assert.equal(res.body[0].dealers[1].address, undefined);
});

test('admin routes need a login', async () => {
  await request(app).get('/api/admin/dealers').expect(401);
  await request(app).post('/api/auth/login').send({ email: 'owner@x.test', password: 'wrong' }).expect(401);
});

test('a generated password must be replaced before anything else', async () => {
  const login = await request(app).post('/api/auth/login').send({ email: 'OWNER@x.test', password: 'temp-password' }).expect(200);
  assert.equal(login.body.user.mustChangePassword, true);
  await request(app).get('/api/admin/dealers').set(auth(login.body.token)).expect(403);
  await request(app).post('/api/auth/password').set(auth(login.body.token)).send({ current: 'temp-password', password: 'short' }).expect(400);
  // Tokens are timed to the second; make sure the old one is from an earlier second.
  await new Promise((r) => setTimeout(r, 1000));
  const changed = await request(app).post('/api/auth/password').set(auth(login.body.token)).send({ current: 'temp-password', password: 'my-own-password' }).expect(200);
  assert.equal(changed.body.user.mustChangePassword, false);
  token = changed.body.token;
  // The old session is signed out.
  await request(app).get('/api/auth/me').set(auth(login.body.token)).expect(401);
  await request(app).get('/api/admin/dealers').set(auth(token)).expect(200);
});

test('admins add, edit and remove dealers, and the public list follows at once', async () => {
  const bad = await request(app).post('/api/admin/dealers').set(auth(token)).send({ name: '', region: 'mars', phone: '12' }).expect(400);
  assert.ok(bad.body.error);

  const created = await request(app).post('/api/admin/dealers').set(auth(token))
    .send({ name: 'New Dealer', region: 'namibia', phone: '+264 61 123 456', address: 'Windhoek' }).expect(201);
  assert.equal(created.body.tel, '+26461123456');
  let pub = await request(app).get('/api/dealers');
  assert.ok(pub.body.some((r: { id: string }) => r.id === 'namibia'));

  const edited = await request(app).put(`/api/admin/dealers/${created.body.id}`).set(auth(token))
    .send({ name: 'New Dealer Windhoek', region: 'namibia', phone: '061 999 999', address: '' }).expect(200);
  assert.equal(edited.body.tel, '+2761999999');
  pub = await request(app).get('/api/dealers');
  const namibia = pub.body.find((r: { id: string }) => r.id === 'namibia');
  assert.equal(namibia.dealers[0].name, 'New Dealer Windhoek');

  await request(app).delete(`/api/admin/dealers/${created.body.id}`).set(auth(token)).expect(204);
  await request(app).delete(`/api/admin/dealers/${created.body.id}`).set(auth(token)).expect(404);
  await request(app).put('/api/admin/dealers/not-an-id').set(auth(token)).send(edited.body).expect(404);
  pub = await request(app).get('/api/dealers');
  assert.ok(!pub.body.some((r: { id: string }) => r.id === 'namibia'));
});

test('analytics shows labelled sample data until GA4 is connected', async () => {
  const res = await request(app).get('/api/admin/analytics?days=7').set(auth(token)).expect(200);
  assert.equal(res.body.source, 'sample');
  assert.equal(res.body.daily.length, 7);
});
