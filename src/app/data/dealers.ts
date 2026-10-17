export interface Dealer {
  readonly name: string;
  /** Phone number as displayed. */
  readonly phone: string;
  /** E.164 number for tel: links. */
  readonly tel: string;
  readonly address?: string;
}

export interface DealerRegion {
  readonly id: string;
  readonly name: string;
  readonly dealers: readonly Dealer[];
}

export const DEALER_REGIONS: readonly DealerRegion[] = [
  {
    id: 'gauteng',
    name: 'Gauteng',
    dealers: [
      {
        name: '266 Suspension',
        phone: '084 593 9734',
        tel: '+27845939734',
        address: '10 Schonefeld Avenue, Bonaero Park, Kempton Park, 1622',
      },
      {
        name: '444 Power Sport',
        phone: '081 894 9646',
        tel: '+27818949646',
        address: '58 Appelgrein Street, Brackenhorst, Alberton, 1448',
      },
      {
        name: 'Adventure MX',
        phone: '082 376 2657',
        tel: '+27823762657',
        address: 'Plot 28, Alexander Road, Tygervalley, Pretoria East, 0084',
      },
      {
        name: 'Arktrixx',
        phone: '011 963 4303',
        tel: '+27119634303',
        address: '97 Boden Road, Benoni,1501',
      },
      {
        name: 'Berm',
        phone: '011 823 5830',
        tel: '+27118235830',
        address: 'Shop 4, The Terminal, Trichardt,Boksburg, 1459',
      },
      {
        name: 'Big5ventures MX',
        phone: '072 909 7521',
        tel: '+27729097521',
        address: '222 Canary Road, Wierda Park, Centurion, 0157',
      },
      {
        name: 'Bike Craft',
        phone: '011 435 6764',
        tel: '+27114356764',
        address: '83 Prairie Street, Rosettenville, Johannesburg, 2190',
      },
      {
        name: 'Bike Kings Pretoria',
        phone: '012 271 0070/1',
        tel: '+27122710070',
        address: 'Shop J1 Willow Way Shopping Centre, Lynnwood road, Pretoria, 0184',
      },
      {
        name: 'Bikeparts',
        phone: '082 892 3349',
        tel: '+27828923349',
        address: '10 Verwoerd avenue Pierre Van Ryneveld Centurion, 0157',
      },
      {
        name: 'Bikers Warehouse',
        phone: '011 795 4122',
        tel: '+27117954122',
        address: '1 Aureole Ave,Northriding, Johannesburg, 2162',
      },
      {
        name: 'Biking Accessories',
        phone: '012 342 6425',
        tel: '+27123426425',
        address: '1212 Pretorius Street, Hatfield, Pretoria, 0028',
      },
      {
        name: 'Boesman Racing',
        phone: '073 282 3355',
        tel: '+27732823355',
        address: 'Unit 2 Canberra Indus Park, 13 Derrick Coetzee Street, Jet Park, Boksburg, 1459',
      },
      {
        name: 'Cycleworx Workshop',
        phone: '082 650 0192',
        tel: '+27826500192',
        address: '98 2nd Street, Linden, Randburg, 2194',
      },
      {
        name: 'EMD Racing',
        phone: '012 667 1041',
        tel: '+27126671041',
        address: '15 Botha Avenue, Lyttelton Manor, Centurion, 0157',
      },
      {
        name: 'EMD Racing Boksburg',
        phone: '087 086 3029',
        tel: '+27870863029',
        address: 'Unit 30, N12 Industrial Park, 27 Dr.Vosloo Road, Bartlett, Boksburg 1459',
      },
      {
        name: 'EnduroShop SA',
        phone: '011 918 4911',
        tel: '+27119184911',
        address: 'Unit 12, N12 Industrial Park, 188 Dr.Vosloo Drive, Bartlett, Boksburg, 1459',
      },
      {
        name: 'Enduro Tech',
        phone: '082 739 6196',
        tel: '+27827396196',
        address: '13 Kayak (Cnr Zeiss Rd), Laser Park, Honeydew, 2170',
      },
      {
        name: 'Fast KTM',
        phone: '011 867 0092',
        tel: '+27118670092',
        address: '1 Voortrekker RD, South Crest, Alberton, 1449',
      },
      {
        name: 'FTR Racing',
        phone: '072 884 7700',
        tel: '+27728847700',
        address: '22 Bedford Avenue, Benoni, 1501',
      },
      {
        name: 'Game Services',
        phone: '011 425 1081',
        tel: '+27114251081',
        address: 'No.4 5Th Avenue, Northmead, Benoni 1501',
      },
      {
        name: 'GBR Racing',
        phone: '083 633 7133',
        tel: '+27836337133',
        address: 'CNR Howard Avenue & Wilstead Avenue, Benoni 1500',
      },
      {
        name: 'Gravel Pit Motorcycles',
        phone: '082 943 8977',
        tel: '+27829438977',
        address: '346 Calliandra Street, Montana, Montana mini units, Unit 2.4, Pretoria, 0182',
      },
      {
        name: 'Guts n Gas',
        phone: '071 101 6146',
        tel: '+27711016146',
        address: '26 Avant Grande Avenue, Northlands Deco Park, Randburg, 2116',
      },
      { name: 'Joffter Off Road', phone: '084 564 2869', tel: '+27845642869', address: 'Randburg' },
      {
        name: 'KTM Centurion',
        phone: '012 643 1110',
        tel: '+27126431110',
        address:
          '13 Centurion Gate Business Park, cnr John Voster & Akkerboom St, Swartkop, Centurion',
      },
      {
        name: 'KTM Motorcycles SA (Pty) LTD',
        phone: '011 462 7796',
        tel: '+27114627796',
        address: '30 Monte Carlo Crescent, Kyalami Business Park, Midrand, 1684',
      },
      {
        name: 'L-Bou Racing',
        phone: '078 524 0044',
        tel: '+27785240044',
        address: 'Plot 14 Riastuine, Parys, 9585',
      },
      {
        name: 'Linex Pretoria',
        phone: '012 501 0120',
        tel: '+27125010120',
        address: 'c/o Simone Vermooten & Lynnwood Road,De Wilgers, Pretoria, 0184',
      },
      {
        name: "Nick's Cycles",
        phone: '011 395 2553',
        tel: '+27113952553',
        address: '27 Van Wyk Road, Brenthood Park, Benoni',
      },
      {
        name: 'NL Designs',
        phone: '072 605 0727',
        tel: '+27726050727',
        address: '7 Duncombe rd,Forest town, Johannesburg, 2193',
      },
      {
        name: 'Offroad Cycles',
        phone: '012 333 6443',
        tel: '+27123336443',
        address: '22 Blesbok Street, Koedoespoort, Pretoria, 0186',
      },
      {
        name: 'Pro Dirt Bike (Pty) Ltd',
        phone: '082 333 5253',
        tel: '+27823335253',
        address: '1 Hefer Street, Risiville, Vereeniging',
      },
      {
        name: 'Raceworx KTM',
        phone: '011 027 9922',
        tel: '+27110279922',
        address: 'Hendrik Potgieter Drive & Zandvliet Road, Wilgespruit 190 Iq, Roodepoort',
      },
      {
        name: 'RAD MOTO',
        phone: '011 234 5007',
        tel: '+27112345007',
        address: '1 Wall Street,Corner Witkoppen Road,Sunninghill,Gauteng 2191',
      },
      {
        name: 'Riverside KTM',
        phone: '087 751 4020',
        tel: '+27877514020',
        address: 'Shop D, 1 Barrage Rd, Vereeniging 1930',
      },
      {
        name: 'RS Motorcycles',
        phone: '011 024 7340',
        tel: '+27110247340',
        address: '102 Webber Road, CNR. 1st Avenue, Shop 14, Lambton, Germiston, 1401',
      },
      {
        name: 'Russell Campbell Dirt bikes',
        phone: '011 452 0504',
        tel: '+27114520504',
        address: '130 Van Riebeeck Ave, Edenvale, 1610',
      },
      {
        name: 'Sherco SA',
        phone: '012 641 0833',
        tel: '+27126410833',
        address:
          'Shop 23 Waterkloof Ridge Lifestyle Centre, 429 Cliff Street, Waterkloof Ridge, Pretoria',
      },
      {
        name: 'Shimwells Yamaha',
        phone: '011 362 2182',
        tel: '+27113622182',
        address: 'The Terminal Centre, Cnr Trithardts & Dr Vosloo Street, Bartlett, Boksbug',
      },
      {
        name: 'Speedhut',
        phone: '011 465 7129',
        tel: '+27114657129',
        address: 'Unit 2, Pineslopes Centre,CNR Forest Rd & Sunset BLVD. Fourways, 2194',
      },
      {
        name: 'Synergy Motorcycles',
        phone: '012 548 9931',
        tel: '+27125489931',
        address:
          'Shop 17/18 Montana Park, cnr Zambesi Drive & Calliandra Str, Montana Park, Pretoria, 0182',
      },
      {
        name: 'Team CIT',
        phone: '012 342 8571',
        tel: '+27123428571',
        address: '1222 Pretorius Street, Hatfield, Pretoria, 002',
      },
      {
        name: 'The Roost',
        phone: '011 362 2255',
        tel: '+27113622255',
        address: '143, 2ND Street Springs 1559',
      },
      {
        name: 'Trax Moto',
        phone: '012 111 0190',
        tel: '+27121110190',
        address:
          'Shop 8, Willow Rock Value Centre, Cnr Solomon Mahlangu Drive & Bendeman Street, Equestria, Pretoria East, 0184',
      },
      {
        name: 'True Wheels',
        phone: '084 290 6350',
        tel: '+27842906350',
        address: 'Unit 2 Inospace Sebenza Works, 131 Terrace Road, Edenvale, 1609',
      },
      {
        name: 'VLA Racing Vic Legacy',
        phone: '016 018 0224',
        tel: '+27160180224',
        address: '40 General Smuts Rd, Duncanville, Vereeniging, 1939',
      },
      { name: 'Wild West', phone: '084 773 0080', tel: '+27847730080', address: 'Centurion, 0157' },
      {
        name: 'Will Moto CC',
        phone: '082 555 0875',
        tel: '+27825550875',
        address: 'Primrose East, Gauteng, 1401',
      },
    ],
  },
  {
    id: 'kwa-zulu-natal',
    name: 'Kwa-Zulu Natal',
    dealers: [
      {
        name: '413 Racing / Balele Motors (Pty) Ltd',
        phone: '034 331 3021',
        tel: '+27343313021',
        address: '34 Van Rooyen Street, Utrecht, 2980',
      },
      {
        name: 'Accessories Unlimited',
        phone: '033 342 4411',
        tel: '+27333424411',
        address: '158 Greyling Str. PMB 3201',
      },
      {
        name: 'Alfie Cox Racing',
        phone: '031 007 0410',
        tel: '+27310070410',
        address: '#15, D246, Cato Ridge, 3680',
      },
      {
        name: 'Big Boy Scooters',
        phone: '031 702 0036',
        tel: '+27317020036',
        address: '6 Caversham Road, Pinetown, 3610',
      },
      {
        name: 'Bikes Unlimited',
        phone: '032 815 0422',
        tel: '+27328150422',
        address: "2 Kudu Park, Imbonini Business Park, Ballito, Shaka's Head, 4381",
      },
      {
        name: 'Bike Worx',
        phone: '031 942 5116',
        tel: '+27319425116',
        address: 'Unit4, 95 Goodwood Road,Westmead, Pinetown, KZN,3608',
      },
      {
        name: 'BT Racing',
        phone: '082 605 0781',
        tel: '+27826050781',
        address: '45 Epping Crescent, Forest Hills, Kloof, KZN 3624',
      },
      {
        name: 'DG International',
        phone: '031 783 4053',
        tel: '+27317834053',
        address: 'LOT 138, Meadway Road, Peacevale, Drummond, 3626',
      },
      {
        name: 'Ekerold Yamaha',
        phone: '033 345 3503',
        tel: '+27333453503',
        address: '340 Victoria Road PMB 3201',
      },
      {
        name: 'Fast Powersports cc',
        phone: '035 789 6378',
        tel: '+27357896378',
        address: '40 Dollar Drv. CBD Richards Bay, 3900',
      },
      {
        name: 'FCR Suspension',
        phone: '072 986 3830',
        tel: '+27729863830',
        address: '4 Glen Avon Place, Waterfall, KZN, 3652',
      },
      {
        name: 'Gear Up',
        phone: '031 566 4932',
        tel: '+27315664932',
        address: 'SHOP 202 The Crescent Shopping Centre Umhlanga Ridge',
      },
      {
        name: 'Hayward Suspension',
        phone: '083 630 5454',
        tel: '+27836305454',
        address: '29 Greenmeadow Lane, Belvedere EXT1, Hillcrest, KZN, 3650',
      },
      { name: 'Locomoto', phone: '083 327 2499', tel: '+27833272499', address: 'Westville, 3630' },
      {
        name: 'Majuba Pitstop',
        phone: '034 312 1175',
        tel: '+27343121175',
        address: '7 Rooibok Avenue, Newcastle, 2940',
      },
      {
        name: 'Moto Mettle',
        phone: '064 017 1553',
        tel: '+27640171553',
        address: 'Unit 10 Alexander Park, 24 Alexander Road, Westmead, Pinetown, KZN, 3610',
      },
      {
        name: 'MX Addicts',
        phone: '031 903 8868',
        tel: '+27319038868',
        address: '37 Main Road, Doonside, 4126',
      },
      {
        name: 'Peak Yamaha Himeville',
        phone: '033 702 1356',
        tel: '+27337021356',
        address: '61 Arbuckle St, Himeville, Underburg, 3256',
      },
      {
        name: 'Perfomance Leisure',
        phone: '039 312 0048',
        tel: '+27393120048',
        address: '7 Palm Crest Centre, National Road, Margate, 4275',
      },
      {
        name: 'Perry Bikes',
        phone: '031 566 7411',
        tel: '+27315667411',
        address: '1 Sneezewood Lane, Glen Anil, Durban, 4051',
      },
      {
        name: 'Raceface',
        phone: '079 564 6709',
        tel: '+27795646709',
        address: '58 Bridle Road, Forest Hills, Kloof, KZN 3610',
      },
      {
        name: 'RBS Yamaha',
        phone: '031 701 1311',
        tel: '+27317011311',
        address: '69 St. Johns Avenue Pinetown, 3610',
      },
      {
        name: 'Ride Durban',
        phone: '031 035 0090',
        tel: '+27310350090',
        address: '21 Park Boulevard Centre, 11 Brownsdrift Road, Umgeni Park, Durban, 4051',
      },
      {
        name: 'Ride High Yamaha',
        phone: '035 789 1851',
        tel: '+27357891851',
        address: '111 Dollar Drive Richards Bay',
      },
      {
        name: 'Rocket Racing',
        phone: '031 702 2606',
        tel: '+27317022606',
        address: 'Unit 3, Power Centre, 21 Lanner Road, Falcon Industrial Park, New Germany, 3620',
      },
      {
        name: 'Rocket Racing PMB',
        phone: '033 264 3240',
        tel: '+27332643240',
        address: '340 Boom Street, PMB,3201',
      },
      {
        name: 'Roost-It',
        phone: '031 765 8101',
        tel: '+27317658101',
        address: '6 Quarry Road, Assagay, 3624',
      },
      {
        name: 'RSS Racing (PTY)Ltd',
        phone: '079 376 7077',
        tel: '+27793767077',
        address: '16, P500, Umlaas Road, Camperdown,KZN',
      },
      {
        name: 'TBR Suspension',
        phone: '073 396 7896',
        tel: '+27733967896',
        address: '24 Park Lane, Kloof, Durban, 0031',
      },
      {
        name: 'TR-Tec Adventure',
        phone: '076 819 7736',
        tel: '+27768197736',
        address: 'Unit 29 Fischer,Blessing Ninela Road, Hillcrest, 3610',
      },
      {
        name: 'UBM Motorcycles',
        phone: '036 352 1484',
        tel: '+27363521484',
        address: '51 Lorne Street Estcourt KZN 3310',
      },
    ],
  },
  {
    id: 'western-cape',
    name: 'Western Cape',
    dealers: [
      {
        name: 'Ace Sports Distribution',
        phone: '061 585 9056',
        tel: '+27615859056',
        address: '6 Osdam Park, 14 Columbus Crescent, Rivergate Parklands, Cape Town 7441',
      },
      { name: 'Anodized Racing', phone: '082 897 5690', tel: '+27828975690' },
      {
        name: 'BF Motorcycles',
        phone: '044 382 3342',
        tel: '+27443823342',
        address: '30 Boswerker Str., Knysna Industrial, Knysna, 6570',
      },
      {
        name: 'Bike Torque',
        phone: '021 982 8917',
        tel: '+27219828917',
        address: '16 Gemini Street, Brackenfell, 1266',
      },
      {
        name: 'Boats & Bikes',
        phone: '021 557 1320',
        tel: '+27215571320',
        address: '4 Anna Park Killarney Ave, Killarney Gardens, 7441',
      },
      {
        name: 'CCC Motorcycles',
        phone: '082 377 2213',
        tel: '+27823772213',
        address: 'Fritz Grub Crescent, Riversdale 6670',
      },
      {
        name: 'CPR',
        phone: '021 551 0446',
        tel: '+27215510446',
        address: '40 Stella Road, Montague Gardens',
      },
      {
        name: 'Craigs Motorcycle Fitment Centre',
        phone: '021 939 8916',
        tel: '+27219398916',
        address: '79 Voortrekker Road Parow',
      },
      {
        name: "Craig's Spares & Accessories",
        phone: '021 511 1916',
        tel: '+27215111916',
        address: '2 Koeberg Road, Maitland, 7405',
      },
      {
        name: 'DirtRider Motorcycles',
        phone: '021 552 8514',
        tel: '+27215528514',
        address: '39B Stella Road; Montague Gardens',
      },
      {
        name: 'DMH Promotions',
        phone: '078 133 3619',
        tel: '+27781333619',
        address: 'Zone 7, Van Schoorsdrift RD, Philadelphia',
      },
      {
        name: 'Droomers Yamaha',
        phone: '021 948 0871',
        tel: '+27219480871',
        address: '72 Voortrekker Rd, Cape Town, 7530',
      },
      {
        name: 'Flying Brick Motorcycle Accessories',
        phone: '021 510 6455',
        tel: '+27215106455',
        address: '8 Shropshire Street, Paarden Eiland, 7405',
      },
      {
        name: 'Foxi',
        phone: '078 844 8830',
        tel: '+27788448830',
        address: '4 Sardinia Ave, Capri Village, Sunvalley, 7975',
      },
      {
        name: 'Garden Route Motorcycles',
        phone: '044 093 0929',
        tel: '+27440930929',
        address: 'Paddagat Shopping Centre, Shop 2, Cnr 3rd Street & Knysna Rd, George, 6529',
      },
      {
        name: 'Go-MX',
        phone: '079 270 8958',
        tel: '+27792708958',
        address: '173 Blaauberg Road, Table View, 7441',
      },
      {
        name: 'GS Bike Traders',
        phone: '079 894 4034',
        tel: '+27798944034',
        address: '61 Strand Street, Bellville, 7530',
      },
      {
        name: 'Helderberg Yamaha',
        phone: '021 850 0080',
        tel: '+27218500080',
        address: 'Shop 2, Urtel Crescent, The Triangle, Somerset Mall',
      },
      {
        name: 'Just Bike Tyre',
        phone: '021 981 8399',
        tel: '+27219818399',
        address: 'Unit L2, Okavano Junction, Kenwil Dr, Brackenfell, 7560',
      },
      {
        name: 'KTM Cape Town',
        phone: '021 511 7966',
        tel: '+27215117966',
        address: '44 Marine Drive, Cape Town',
      },
      {
        name: 'KTM Paarl',
        phone: '021 879 4630',
        tel: '+27218794630',
        address: 'Zandwyk Business Park, R101 Old Paarl Road, Paarl, 7646',
      },
      {
        name: 'Motolife',
        phone: '021 593 9736',
        tel: '+27215939736',
        address: '79 Seventh Avenue, Maitland, 7405',
      },
      { name: 'Motoworx', phone: '073 232 5389', tel: '+27732325389', address: 'Brackenfell' },
      {
        name: 'Muddy Offroads',
        phone: '071 605 1606',
        tel: '+27716051606',
        address: '2 Theron Street, Industrial Area, Plettenberg,6600',
      },
      {
        name: 'Plushrides Suspension',
        phone: '082 906 3553',
        tel: '+27829063553',
        address: 'Hout Bay, 7872',
      },
      {
        name: 'PSS Racing',
        phone: '073 231 4391',
        tel: '+27732314391',
        address: '18 Aster Street, Helderview, Western Cape',
      },
      {
        name: 'RCR Motorcycles',
        phone: '021 823 4455',
        tel: '+27218234455',
        address: '198 Durban Road Bellville Cape Town 7530',
      },
      {
        name: 'Swartland Yamaha',
        phone: '022 022 0049',
        tel: '+27220220049',
        address: '46 Main Street, Moorreesburg, 7310',
      },
      {
        name: 'TM Racing',
        phone: '074 950 0132',
        tel: '+27749500132',
        address: '92 Drommedaris Street, Gordons Bay, 7140',
      },
    ],
  },
  {
    id: 'free-state',
    name: 'Free State',
    dealers: [
      {
        name: '411 Motorsport',
        phone: '051 228 0899',
        tel: '+27512280899',
        address: '35 Nelson Mandela Drive Bloemfontein 9301',
      },
      {
        name: 'Honda Wing Central (Husqvarna)',
        phone: '051 430 1237',
        tel: '+27514301237',
        address: '132 Nelson Mandela Drive, Westdene, Bloemfontein, 9301',
      },
      {
        name: 'Orange County KTM',
        phone: '051 447 2658',
        tel: '+27514472658',
        address: '51 Nelson Mandela Drive Bloemfontein 9301',
      },
      {
        name: 'Probike and Car Service',
        phone: '058 303 0064',
        tel: '+27583030064',
        address: 'C/O Pretorius and Archbell Bethlehem, 9701',
      },
      {
        name: 'Probike Welkom',
        phone: '057 396 4828',
        tel: '+27573964828',
        address: '137C Jan Hofmeyer Road, Industria , Welkom',
      },
      {
        name: 'Safari 4 x 4',
        phone: '051 430 3831',
        tel: '+27514303831',
        address: '104 Zastran Straat, Westdene, Bloemfontein 9301',
      },
      {
        name: 'Salleys Yamaha',
        phone: '051 430 3326',
        tel: '+27514303326',
        address: '55 Nelson Mandela Drive Bloemfontein',
      },
    ],
  },
  {
    id: 'eastern-cape',
    name: 'Eastern Cape',
    dealers: [
      {
        name: 'Aliwal North Motorcycle Services',
        phone: '082 875 5621',
        tel: '+27828755621',
        address: 'C/O Jobert & Grey Streets, Lady Grey',
      },
      {
        name: 'Auto Motorcycles',
        phone: '041 581 1699',
        tel: '+27415811699',
        address: '153 Heugh Road, Walmer, PE, 6065',
      },
      {
        name: 'IMB ADVENTURE',
        phone: '041 364 1090',
        tel: '+27413641090',
        address: '7 7th Avenue, Newton Park, Port Elizabeth, 6045',
      },
      {
        name: 'KTM Port Elizabeth',
        phone: '041 450 5540',
        tel: '+27414505540',
        address: '19 Butterfield Crescent, Fairview, Port Elizabeth,6070',
      },
      {
        name: 'One Racing South Africa',
        phone: '082 787 0621',
        tel: '+27827870621',
        address: '6 Chelmford Avenue, Essexvale, Port Elizabeth, 6001',
      },
      {
        name: 'Sherco East London',
        phone: '072 265 9588',
        tel: '+27722659588',
        address: 'SMA Engineering, 17 Mercury Road, Woodbrook, East London',
      },
      {
        name: 'TKY Power Products',
        phone: '043 748 1212',
        tel: '+27437481212',
        address: '52 Sherwood Avenue, Beacon Bay, East London, 5241',
      },
      {
        name: 'Track and Tar',
        phone: '084 947 5740',
        tel: '+27849475740',
        address: 'Shop 4A Dijon Road, Lorraine, Port Elizabeth 6070',
      },
      {
        name: 'Wetherd Racing',
        phone: '073 129 7656',
        tel: '+27731297656',
        address: 'Lilly Farm, R72 Kidds Beach, East London, 5264',
      },
      {
        name: 'Wildcoast KTM',
        phone: '083 570 4334',
        tel: '+27835704334',
        address: '18 Brill Street, Arcadia East London, 5201',
      },
      {
        name: 'Xtreme Yamaha',
        phone: '041 581 0030',
        tel: '+27415810030',
        address: '154 Heugh Road, Walmer, PE, 6065',
      },
    ],
  },
  {
    id: 'northern-cape',
    name: 'Northern Cape',
    dealers: [
      {
        name: 'RND Motorcycles',
        phone: '053 831 1781',
        tel: '+27538311781',
        address: '17 Barkly Road Kimberley 8301',
      },
      {
        name: 'Yamaha Crescent',
        phone: '053 807 7760',
        tel: '+27538077760',
        address: '10-12 Hendrik van Eck Str. Kimdustria, Kimberley 8301',
      },
    ],
  },
  {
    id: 'mpumalanga',
    name: 'Mpumalanga',
    dealers: [
      {
        name: 'KTM Nelspruit',
        phone: '013 753 7354',
        tel: '+27137537354',
        address: 'Corner of Weir & Lydenburg Road, Riverside Park, Nelspruit 1200',
      },
      {
        name: 'Nelspruit Yamaha Rudamans',
        phone: '013 752 7077',
        tel: '+27137527077',
        address: 'No.4 Tranquil Flow Street, Riverside, Nelspruit, 1200',
      },
      {
        name: 'No Limits Racing',
        phone: '076 365 6625',
        tel: '+27763656625',
        address: 'Shop 34 Sonpark Industrial, Nelspruit 1200',
      },
      {
        name: 'Pitlane Motorcycle Accessories',
        phone: '013 755 2127',
        tel: '+27137552127',
        address: 'Nelspruit Industrial, 1 Plankie Street, Lowveld, Nelspruit',
      },
      {
        name: 'Protek',
        phone: '013 752 4742',
        tel: '+27137524742',
        address: 'Shop 2, 9 Suikerriet Street, Nelspruit, 1200',
      },
      {
        name: 'Roaring Wheels',
        phone: '083 612 2389',
        tel: '+27836122389',
        address: '8 Laing Str., Secunda, 2302',
      },
      {
        name: 'Vans Big Boy Scooters',
        phone: '013 282 0766',
        tel: '+27132820766',
        address: '190 Cowen Ntuli Street, Middelburg 1055',
      },
    ],
  },
  {
    id: 'north-west-province',
    name: 'North West Province',
    dealers: [
      {
        name: "Moto's @ Klerksdorp",
        phone: '018 468 1800',
        tel: '+27184681800',
        address: '24 Leonard Street, Elandia, Klerksdorp, 2570',
      },
    ],
  },
  {
    id: 'limpopo',
    name: 'Limpopo',
    dealers: [
      {
        name: 'Marula Dirt Bikes',
        phone: '082 749 5114',
        tel: '+27827495114',
        address: '17 Maroela Park,53 Koedoe Street, Hoedspruit, Limpopo, 1380',
      },
      {
        name: 'RAD MOTO Polokwane',
        phone: '015 297 0095',
        tel: '+27152970095',
        address: '103B Schoeman Street, Polokwane Central, Polokwane, 0699',
      },
    ],
  },
  {
    id: 'namibia',
    name: 'Namibia',
    dealers: [
      {
        name: 'Bike & Quad Clinic',
        phone: '+264 613 02594',
        tel: '+26461302594',
        address: '196 mandume Ndemufayo, Windhoek, Namibia',
      },
      {
        name: 'CBT Namibia',
        phone: '+264 81 129 1288',
        tel: '+264811291288',
        address: '243 Nickle Street, Prosperita, Windhoek, Namibia, 10025',
      },
      {
        name: 'Central Cycles Namibia',
        phone: '+264 811 283 180',
        tel: '+264811283180',
        address: 'Unit 5 - N040, TV Moore Street, Southern Industrial Area, Windhoek, Namibia',
      },
      {
        name: 'Yamaha Windhoek',
        phone: '+264 61 253 692',
        tel: '+26461253692',
        address: '4-6 Moore Street, Windhoek, Namibia',
      },
    ],
  },
  {
    id: 'mauritius',
    name: 'Mauritius',
    dealers: [
      {
        name: 'Stag Trax Co LTD',
        phone: '+23 05 727 8426',
        tel: '+23057278426',
        address: 'Fast Hub, Coeur De Ville, Avenue De La Salette, Grand Baie, Mauritius',
      },
    ],
  },
  {
    id: 'zimbabwe',
    name: 'Zimbabwe',
    dealers: [
      {
        name: 'CORPCLO',
        phone: '+02 63 7722 68971',
        tel: '+263772268971',
        address: 'Harare Dr, Harare, Zimbabwe',
      },
    ],
  },
];

export const DEALER_COUNT = DEALER_REGIONS.reduce((n, r) => n + r.dealers.length, 0);
