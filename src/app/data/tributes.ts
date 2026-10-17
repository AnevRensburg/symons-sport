export interface Tribute {
  readonly id: string;
  readonly author: string;
  /** Paragraphs of the message; single line breaks are kept as "\n". */
  readonly paragraphs: readonly string[];
}

export const TRIBUTES: readonly Tribute[] = [
  {
    id: 'haley',
    author: 'Haley',
    paragraphs: [
      'Hi Phillip,',
      "In case you don't recognize my name, it's Haley Cooper-Cox, Dale's daughter. I had to hunt down your email address which is why you haven't heard from me sooner. We are all very sorry to hear about Elmer. My dad, my brother, Casey and I are all heartbroken. Your brother has a very special place in our hearts and our lives. I have some pictures I want to email you from my wedding (I will have to do that from my computer at home). I was truly touched that Elmer made it up hear for that. He helped out tremendously behind the scenes too. Casey and I closed on our house the day before our wedding and so my dad and Elmer moved our bed in so we could stay there on our wedding night. After the wedding and the reception were over and we went to our new house, and of course I had plenty of champagne at the reception, but we had no toilet paper for me to go pee. So your brother saved the day. He rode one of my dad's motorcycles down to our house in the rain to deliver us toilet paper. He would call us often to check in and see how everyone was doing. We were hoping to get him out this way for Thanksgiving but he was just too busy. He thought he might be able to make it before he moved back to South Africa. We offer our deepest sympathies and our greatest respect. We know how had it is to lose a loved one. Elmer is truly loved and will be deeply missed. If you are ever in the country, we would love to see you again. You are always a welcome part of our family.",
      'Take care and much love,\nHaley',
    ],
  },
  {
    id: 'schalk-and-anne-marie',
    author: 'Schalk & Anne-Marie Bornman',
    paragraphs: [
      'Beste Philip,',
      "Ons is 'n Suid-Afrikaanse gesin wat in Marokko woonagtig is. Eerstens wil ons ons medelye en innige simpatie betuig aan julle almal met hierdie tragiese afsterwe van Elmer. Dit is 'n groot slag en alles het so onverwags gebeur. Aanvaar dus hiermee ons innige meegevoel met julle as gesin. Alhoewel ons nie vir Elmer geken het nie, het ons steeds 'n baie aangename gesprek met hom gehad aan die einde van Stage 3, net nadat hulle van Nador naby Errachidia (Tilsinnt) geeindig het. Ek het ook enkele fotos geneem. Hy was baie opgewonde oor sy prestasie en het dadelik sy VSA mederyer geluk gewens met sy mooi prestasie. Die volgende oggend het ons hom ook afgesien by die wegspringpunt by Rissani, begin van Stage 4. Ek is jammer dat ons nou eers kontak maak, maar, ons het sopas julle webadres aanlyn in die Beeld gelees. Ek heg hierby die fotos aan. Hoop dit is aangename herinneringe vir julle. Laastens wil ek vir julle as gesin baie sterkte toewens in hierdie tyd van rou. Mag ons Hemelse Vader deur die krag van die Heilige Gees, persoonlik by julle elkeen wees. Mag Hy julle vertroos en vir julle Sy rus en vrede gee, daardie vrede wat ons verstand te bowe gaan. Philippians 4:7 And God's peace, which is far beyond human understanding, will keep your hearts and minds safe in union with Christ Jesus. Mag die Skrif uit Romeine 8:28 vir jul ook versterk: Romans 8:28 We know that in all things God works for good with those who love him, those whom he has called according to his purpose.",
      'Baie seen vir julle.\nSchalk en Anne-Marie Bornman',
    ],
  },
  {
    id: 'cindy',
    author: 'Cindy Coetzee',
    paragraphs: [
      'Dear Phillip, Jualeen and Family.',
      "As a friend of Elmer I just want to sympathies to you all. We all knew he was a great person, and we will miss him a lot. But I've peace in my heart and know God needed him much more than we do. I know we all ask why Elmer, but we must remember God came to take us on our peack time. And I know at that moment Elmer was the happiest person. So I hope you will also find peace and understanding. And remember if any of you need a helping hand or someone to talk to just let me know. Because Elmer would have done the same for me.",
      'Regards\nCindy Coetzee',
    ],
  },
  {
    id: 'steve',
    author: 'Steve Fouchee',
    paragraphs: [
      'Philip,',
      "I wanted you to know that I'm thinking about you and your family and that you are in my prayers. Elmer was an excellent person and will be sorely missed by all who knew him. He had a focus, a drive, and perseverance that I have never known in another person. It was inspiring. I feel better for having known him and I know that I'm not the only person that he inspired. That is a good legacy to leave behind. It was an honor to be his friend as it is to be yours. Know that between Troy and myself you always have a home here in America.",
      'God Bless You,\nSteve Forshee',
    ],
  },
  {
    id: 'brett',
    author: 'Brett Strydom',
    paragraphs: [
      'Hi Philip',
      'My deepest condolences on the death of your brother. I myself race Off Road motorcycles. I had a brother who raced Off Road with me but was unfortunately killed in a Superbike accident 2 years ago, so I have some understanding of how you must feel. Stay strong and remember your brother was and still is a great motivation to a lot of riders out there. I plan to ride the roof this year and will dedicate my finishing this event to Elmer.',
      'All the best\n# 402 Brett Door Zone Kawasaki Racing Team',
      'Kind Regards\nBrett Strydom',
    ],
  },
  {
    id: 'kim',
    author: 'Kim Carpenter',
    paragraphs: [
      'Phillip,',
      'Your brother was not only a friend, but a fellow club member of Rovers MC and racer in District 37. I am proud to say I knew him. I am stunned and saddened by the loss of Elmer. Please know he was loved and respected by all who knew him. I continue to pray for you and your family.',
      'Kim Carpenter',
      'Rovers MC\nRescue 3\nDistrict 37, AMA',
    ],
  },
  {
    id: 'terry-and-christie',
    author: 'Terry & Christie Poe',
    paragraphs: [
      'Hi,',
      'I had the pleasure to meet Elmer in Muenster, Texas. He was practicing for the Last Man Standing event in December, 2006. I was riding with some fellow KTM friends and met Elmer and his partner Brian, I believe. We camped out with them and did some trail riding the next day. Elmer was very friendly to me and my wife Christie. I will remember him and his smile for quite some time. I was impressed with his riding skills, but his personality really showed. God bless the family and friends and I hope you will hang on the memories as we all will do.',
      'With sympathy,\nTerry & Christie Poe',
      'Tyler, Texas USA',
    ],
  },
  {
    id: 'candace-and-ken',
    author: 'Candice Weaver & Ken Painter',
    paragraphs: [
      'To the family of Elmer Symons,',
      "My name is Candace Weaver, I had the pleasure of meeting Elmer last month at the Red Bull's Last Man Standing race in Bulcher , TX. Bart Hayes with Powersport Grafx had given him a ride out there, Bart is a friend of ours. After the race everyone was at the I-Hop getting a bite to eat, and he was talking about racing the Dakar. We are in shock and devastated at the news. Please know that your family are in our prayers. After looking at all the forums, I believe he touched so many lives. I know that he touched mine and Ken's.",
      'Candace Weaver & Ken Painter',
    ],
  },
  {
    id: 'paul',
    author: 'Paul Aniceto',
    paragraphs: [
      'Hey Philip,',
      'I am terribly sorry to hear the news of Elmer in the Dakar, my prayers go out to you and your family. Elmer was always good to me and never let his great success get the better of him always down to earth,the same as the first time me ,paul eastwood and mike munroe took you and elmer to the Harrismith enduro and Elmer was on a DT 125 and he finished first, do you remember?',
      'Well Philip, I now live here in the USA.\nPaul Aniceto',
    ],
  },
  {
    id: 'mark-and-liz',
    author: 'Mark & Liz Chemaly',
    paragraphs: [
      'Hi Phil',
      'It is with great sadness i write to you please accept our condolences for the sad loss of Elmer. Many times i told you Elmer was the best rider I had ever seen remember at the Roof when he beat all the guys by 20 minutes. It was a very sad day for all may God bless you and your family at this time.',
      'Please call me if you need anything.\nGod Bless\nMark & Liz Chemaly',
    ],
  },
  {
    id: 'christy',
    author: 'Christy Warren',
    paragraphs: [
      'Philip,',
      "My name is Christy Warren and I live in Bauxite, Arkansas. My family and I would like to extend our thoughts to you at this difficult time. Elmer came to Arkansas and did a class and my husband and son attended it. They adored him and have talked of him everyday since they met him. It means a lot to me that he was such a great rider and competitor obviously well on his way to the top and took time out of his training to help some amateurs learn more about riding. He took special time with my son Justin who is 11 and was the only kid at the class and that really means a lot. Elmer really motivated Justin to train hard and have fun too! He just started riding in December of 2005 and he has already accomplished so much. He started racing in the middle of the series and he ended up placing fourth overall in his class. Justin and my husband Scott proudly hung their posters Elmer autographed for them and they are now even more precious to them than ever. He will forever be an influence in their riding and life. It's not every day that you get to meet someone who is as nice, special as well as talented as Elmer and I just wanted to let you know that he will be missed here by many. Our thoughts and prayers are with you and your family at this difficult time and we will continue to remember you for many days to come.",
      'Sincerely,\nChristy Warren',
    ],
  },
  {
    id: 'kathy',
    author: 'Kathy Fletcher',
    paragraphs: [
      "Oh my, he was so happy to be doing this, so grateful to you that you helped him achieve this goal, we talked about it the day he left the states. I am so sad to have lost this friend, I can only imagine the grief you must feel. I keep thinking it just can't be true, that there is some horrible mistake. If there is anything we can do, can help with, please let Malcolm or Troy or I know. We will do our best to help. Elmer was such a blessing in my life. He often spoke of the influence you had in making him the man he was. Thank you for that. He is loved and will be sorely missed.",
      'Kathy Fletcher',
    ],
  },
  {
    id: 'robin',
    author: 'Robin Adams',
    paragraphs: [
      'Philip & Jauleen, John & Wendy, Grant, Eileen & Norm, James, Dane, Tom',
      'Many people live most of their lives dreaming about the ONE - day that they will "live that dream" YOU good people helped Elmer to "LIVE HIS DREAM" Elmer lived more in His short life than most people "live" in a lifetime Elmer got to Live and Race with the best that motorcycle racing has to offer. Elmer "LIVED the DREAM" I hope all the Good times and Good memories that You\'ve shared together will ease the pain',
      'Our Sincerest Condolences\nRobin Adams, "Two-Boy" Andrew Shaw and the rest of the "Old Pre-runners"',
    ],
  },
  {
    id: 'bryan',
    author: 'Bryan Henson',
    paragraphs: [
      'Philip,',
      'I am strucken with a loss for words right now. Elmer was a true friend to me and I would have done anything for him and without a doubt he would return the favor. During the time spent with Elmer I felt like we became pretty close. I will never forget about Elmer and I will continue to tell people of him.',
      'Best Regard,\nBryan Henson',
    ],
  },
  {
    id: 'chris',
    author: 'Chris White',
    paragraphs: [
      'Dear Philip and Jualeen,',
      'You dont know me but I am one of the many many people whos life was touched by meeting your Brother. I am very sad to be writing to you under these circumstances and would like to offer you my sincerest, heartfelt apologies for the tragedy that you have suffered on this day. The world is a Dakar place with the passing of Elmer. He will not be forgotten. My prayers are with Elmer and you all. My deepest condolences to you all. Elmer was a one of a kind individual. A top notch, class act person. One of the very few people that I have ever met, who impressed me in such a way. He gave his time ad self unselfishly to all who were around him. He took 2 days out of his training time for Last Man Standing to ride with a bunch of no-bodys from Arkansas. That is how I came to know him and how I will always remember him. God speed my brother. May God be with you all, family and friends.',
      'Sincerely,\nChris White',
    ],
  },
  {
    id: 'steven',
    author: 'Steven Kempson',
    paragraphs: [
      'Hi Philip,',
      "Firstly I'd like to send my condolences to you and your family. I am really sorry to hear the news about Elmer. I live in the UK and have been here since 1999. Whenever the DAKAR was televised I would often think of you and Elmer. It looks like he really did super well in his career.",
      'Best wishes.\nSteven Kempson',
    ],
  },
  {
    id: 'etienne',
    author: 'Etienne vd Merwe',
    paragraphs: [
      'Dear Philip',
      "Please accept my deepest sympathy, and know that you are in my prayers. A tragic and shocking loss. Elmer was my age and I cannot stop thinking about how close to home this feels to me and I have never met him or you. I remember looking at Elmer's site last week thinking that I would like to be able to attempt the Dakar one day too, and respecting everything Elmer has achieved. Please advise on where the funeral will be, If I cannot be there at least I could spare a moment of silence for a real hero.",
      'Sincerely yours\nEtienne vd Merwe',
    ],
  },
];
