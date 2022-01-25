const app = require('../libs/NewAddNewCompany.js');

const mongoose = require('mongoose');
require('../models/Company');

mongoose.promise = global.Promise;

mongoose.connect("mongodb+srv://Oleg:zcxvcbvn123456@cluster0.q5cib.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true });



let a =[
    // {
    //     ticker: 'aapl',
    //     description : "Apple  — американская корпорация, производитель персональных и планшетных компьютеров, аудиоплееров, смартфонов, программного обеспечения. Один из пионеров в области персональных компьютеров и современных многозадачных операционных систем с графическим интерфейсом. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/apple--600.png",
    // },{
    //     ticker: 'MSFT',
    //     description : "Ма́йкрософт — одна из крупнейших транснациональных компаний по производству проприетарного программного обеспечения для различного рода вычислительной техники — персональных компьютеров, игровых приставок, КПК, мобильных телефонов и прочего.",
    //     avatar : "https://pngimg.com/uploads/microsoft/small/microsoft_PNG18.png",
    // },{
    //     ticker: 'AMZN',
    //     description : "Amazon — американская компания, крупнейшая в мире на рынках платформ электронной коммерции и публично-облачных вычислений по выручке и рыночной капитализации. Штаб-квартира — в Сиэтле.",
    //     avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwbuxuwbaXRDxm5YXe3xzsln4k6vytVkqBxZYQuLC6a66Iwar1scNemxBUeoly8V5wmHw&usqp=CAU",
    // },{
    //     ticker: 'FB',
    //     description : "Facebook — крупнейшая социальная сеть в мире и одноимённая компания Facebook, Inc., владеющая ею. Была основана 4 февраля 2004 года Марком Цукербергом и его соседями по комнате во время обучения в Гарвардском университете — Эдуардо Саверином, Дастином Московицем и Крисом Хьюзом.",
    //     avatar : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png",
    // },{
    //     ticker: 'JPM',
    //     description : "JPMorgan Chase, «Джей Пи Морган Чейс» — американский финансовый холдинг, образовавшийся в результате слияния нескольких крупных банков США. Штаб-квартира банка находится в Нью-Йорке, на Манхэттене. Входит в «большую четвёрку» банков США, наряду с Bank of America, Citigroup и Wells Fargo.",
    //     avatar : "https://go.distance.ncsu.edu/gd203/wp-content/uploads/2020/04/704a1e534e8dc0138eee3ded449555d5-860x860.png",
    // },{
    //     ticker: 'JNJ',
    //     description : "Johnson & Johnson, «Джонсон энд Джонсон» — американская холдинговая компания, возглавляющая группу из более чем 250 дочерних компаний по всему миру, производящих лекарственные препараты, санитарно-гигиенические товары и медицинское оборудование.",
    //     avatar : "https://pbs.twimg.com/profile_images/1101560913885315074/9KHsZD7M_400x400.png",
    // },{
    //     ticker: 'GOOG',
    //     description : "Alphabet Inc. — холдинг, располагающийся в Калифорнии. Владеет несколькими компаниями, ранее принадлежавшими Google Inc, и самой Google Inc в том числе. В 2018 году заняла первое место в списке 500 лучших работодателей мира по мнению журнала Forbes.",
    //     avatar : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png",
    // },{
    //     ticker: 'XOM',
    //     description : "Exxon Mobil Corporation — американская компания, одна из крупнейших нефтяных компаний в мире, одна из крупнейших корпораций в мире по размеру рыночной капитализации. Штаб-квартира компании расположена в городе Ирвинг, пригород Далласа, штат Техас.",
    //     avatar : "https://smart-lab.ru/uploads/articles/00/32/43/thumbnail.webp",
    // },{
    //     ticker: 'BAC',
    //     description : "Bank of America, «Бэнк ов Америка», Банк Америки — американский финансовый конгломерат, оказывающий широкий спектр финансовых услуг частным и юридическим лицам. Входит в четвёрку крупнейших банков США, наряду с Citigroup, Wells Fargo и JPMorgan Chase.",
    //     avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgtCABoe9E-0I18DIcS-DtsV71oQ0cpZbRWA&usqp=CAU",
    // },{
    //     ticker: 'INTC',
    //     description : "Intel — американская компания, разработчик и производитель электронных устройств и компьютерных компонентов: микропроцессоров и наборов системной логики для клиентских вычислительных систем и для дата-центров, ПЛИС, чипов для систем искусственного интеллекта и для интернета вещей, энергонезависимой памяти.",
    //     avatar : "https://s3-symbol-logo.tradingview.com/intel--600.png",
    // },{
    //     ticker: 't',
    //     description : "AT&T Inc — американский транснациональный телекоммуникационный конгломерат со штаб-квартирой в Далласе, штат Техас. Крупнейшая в мире телекоммуникационная компания и один из крупнейших медиаконгломератов. Является крупнейшим поставщиком как местной, так и дальней телефонной связи в США, а также вторым по величине сотовым оператором в США.",
    //     avatar : "https://s3-symbol-logo.tradingview.com/at-and-t--600.png",
    // },{
    //     ticker: 'V',
    // },{
    //     ticker: 'GAZP.ME',
    //     description : "Публичное акционерное общество «Газпром» — российская транснациональная энергетическая компания, более 50 % акций которой принадлежит государству. Является холдинговой компанией Группы «Газпром». Непосредственно ПАО «Газпром» осуществляет только продажу природного газа и сдаёт в аренду свою газотранспортную систему.",
    //     avatar : "https://s3-symbol-logo.tradingview.com/gazprom--600.png",
    // },{
    //     ticker: 'LKOH.ME',
    //     description : "«Лукойл» — российская нефтяная компания, вторая по объёмам нефтедобычи в России. Вторая после «Газпрома» по объёмам выручки компания в России, по состоянию на 1 января 2011 года являлся третьей в мире частной нефтяной компанией",
    //     avatar : "https://s3-symbol-logo.tradingview.com/lukoil--600.png",
    // },
    // {
    //     ticker: 'CSCO',
    //     description : "Cisco — американская транснациональная компания, разрабатывающая и продающая сетевое оборудование, предназначенное в основном для крупных организаций и телекоммуникационных предприятий. Одна из крупнейших в мире компаний, специализирующихся в области высоких технологий",
    //     avatar : "https://s3-symbol-logo.tradingview.com/cisco--600.png",
    // },{
    //     ticker: 'CVX',
    //     description : "Chevron Corporation, Шеврон Корпорэйшн — крупнейшая интегрированная энергетическая компания США, одна из крупнейших корпораций в мире. Основные месторождения компании находятся в США, Австралии и Казахстане. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/chevron--600.png",
    // },{
    //     ticker: 'UNH',
    //     description : "UnitedHealth Group — крупнейшая компания США в области медицинского страхования. Обслуживает более 100 млн клиентов в США и некоторых других странах. UnitedHealth Group заняла 6-е место в списке крупнейших американских компаний Fortune 500 и 35-е в списке Fortune Global 500. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/unitedhealth--600.png",
    // },{
    //     ticker: 'PFE',
    //     description : "Pfizer, Inc. — американская транснациональная фармацевтическая компания, одна из крупнейших в мире. Компания производила самый популярный в мире препарат липитор; этот препарат используется для снижения уровня холестерина в крови, за период с 1997 по 2012 год его было продано на 125 млрд $. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/pfizer--600.png",
    // },{
    //     ticker: 'HD',
    //     description : "The Home Depot — американская торговая сеть, являющаяся крупнейшей на планете по продаже инструментов для ремонта и стройматериалов. Штаб-квартира компании находится в Винингсе. В компании работают 355 тыс. сотрудников. Сеть оперирует 2.144 магазинами в США, Канаде, Мексике и Китае.",
    //     avatar : "https://s3-symbol-logo.tradingview.com/home-depot--600.png",
    // },{
    //     ticker: 'PG',
    //     description : "The Procter & Gamble Company — американская транснациональная компания, один из лидеров мирового рынка потребительских товаров. Акции компании учитываются при расчёте Промышленного индекса Доу Джонса. Компания занимает 34-е место в списке Fortune 500 (2016 год). P&G является крупнейшим в мире рекламодателем, затраты компании на рекламу превышают $8 млрд. Штаб-квартира компании расположена в Цинциннати (штат Огайо).  ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/procter-and-gamble--600.png",
    // },{
    //     ticker: 'VZ',
    //     description : "Американская телекоммуникационная компания. Более двух третей выручки даёт дочернее общество Verizon Wireless, которое является крупнейшим в США поставщиком услуг беспроводной связи. Корпоративный компонент Dow Jones Industrial Average. Штаб-квартира компании находится на Манхэттене, в Нью-Йорке, сама компания зарегистрирована в штате Делавэр.  ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/verizon--600.png",
    // },{
    //     ticker: 'C',
    //     description : "Citigroup Inc., «Ситигруп» — один из крупнейших международных финансовых конгломератов. Основой конгломерата является Citibank, основанный в 1812 году. Компания образовалась 7 апреля 1998 года в результате слияния Citicorp и Travelers Group ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/citigroup--600.png",
    // },{
    //     ticker: 'ABBV',
    //     description : "AbbVie - американская публичная биофармацевтическая компания, основанная в 2013 году. Она возникла как дочерняя компания Abbott Laboratories. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/abbvie--600.png",
    // },{
    //     ticker: 'BA',
    //     description : "Американская корпорация. Один из крупнейших мировых производителей авиационной, космической и военной техники. Штаб-квартира находится в Чикаго. Место дислокации основных производственных мощностей и одновременно с этим место рождения корпорации — Сиэтл. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/boeing--600.png",
    // },{
    //     ticker: 'KO',
    //     description : "The Coca-Cola Company — американская пищевая компания, крупнейший мировой производитель и поставщик концентратов, сиропов и безалкогольных напитков. Наиболее известным продуктом компании является напиток Coca-Cola. Входит в список Fortune 500 по итогам 2020 года. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/coca-cola--600.png",
    // },{
    //     ticker: 'CMCSA',
    //     description : "Comcast Corporation, «Комкаст корпорейшн» — американская телекоммуникационная корпорация. Состоит из трёх основных подразделений, Comcast Cable, NBCUniversal и Sky. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/comcast--600.png",
    // },{
    //     ticker: 'MA',
    //     description : "MasterCard Worldwide или MasterCard Incorporated — международная платёжная система, транснациональная финансовая корпорация, объединяющая 22 тысячи финансовых учреждений в 210 странах мира. Главная штаб-квартира компании находится в округе Уэстчестер, штат Нью-Йорк, США",
    //     avatar : "https://s3-symbol-logo.tradingview.com/mastercard--600.png",
    // },{
    //     ticker: 'PM',
    //     description : "Philip Morris International — американская табачная компания, один из крупнейших производителей сигарет в мире. До 2008 года ФМИ входила в состав Altria Group, а с 28 марта 2008 года стала независимой компанией. ФМИ выпускает табачную продукцию и бездымные продукты на 46 фабриках и реализует их в 180 странах. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/philip-morris--600.png",
    // },
    // {
    //     ticker: 'PEP',
    //     description : "PepsiCo — американская транснациональная корпорация в сфере пищевой промышленности, производитель безалкогольных напитков и других продуктов питания. Штаб-квартира — в Перчейзе, штат Нью-Йорк. Компания образовалась в 1965 году в результате слияния The Pepsi Cola Company с компанией Frito Lay. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/pepsico--600.png",
    // },{
    //     ticker: 'ORCL',
    //     description : "Oracle — американская корпорация, второй по величине доходов производитель программного обеспечения, крупнейший производитель программного обеспечения для организаций, крупный поставщик серверного оборудования. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/oracle--600.png",
    // },{
    //     ticker: 'DIS',
    //     description : "«The Walt Disney Company» — один из крупнейших медиаконгломератов индустрии развлечений в мире. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/walt-disney--600.png",
    // },{
    //     ticker: 'MRK',
    //     description : "Merck & Co— транснациональная фармацевтическая компания со штаб-квартирой в США ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/merck-and-co--600.png",
    // },{
    //     ticker: 'NVDA',
    //     description : "Nvidia — американская технологическая компания, разработчик графических процессоров и систем на чипе ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/nvidia--600.png",
    // },{
    //     ticker: 'MMM',
    //     description : " 3M — американская химическая корпорация работающая в области промышленности, безопасности работников, здравоохранения и товаров повседневного спроса. Штаб-квартира — в городе Сент-Пол, штат Миннесота.",
    //     avatar : "https://s3-symbol-logo.tradingview.com/3m--600.png",
    // },{
    //     ticker: 'IBM',
    //     description : "IBM — американская компания со штаб-квартирой в Армонке, один из крупнейших в мире производителей и поставщиков аппаратного и программного обеспечения, а также IТ-сервисов и консалтинговых услуг ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/international-bus-mach--600.png",
    // },{
    //     ticker: 'NFLX',
    //     description : "Netflix — американская развлекательная компания, поставщик фильмов и сериалов на основе потокового мультимедиа. Основана 29 августа 1997 года Ридом Хастингсом и Марком Рэндольфом.  ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/netflix--600.png",
    // },
    // {
    //     ticker: 'MO',
    //     description : "«Алтриа Груп» — американская компания, один из лидеров мирового рынка табачных изделий. Входила в список Fortune 1000 по итогам 2005 года. Штаб-квартира — в Хенрайко.«Алтриа Груп» — американская компания, один из лидеров мирового рынка табачных изделий. Входила в список Fortune 1000 по итогам 2005 года. Штаб-квартира — в Хенрайко. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/altria--600.png",
    // },{
    //     ticker: 'WMT',
    //     description : "Walmart, Inc. — американская компания, управляющая крупнейшей в мире сетью оптовой и розничной торговли, действующей под торговой маркой Walmart. Штаб-квартира находится в Бентонвилле, штат Арканзас ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/walmart--600.png",
    // },
    // {
    //     ticker: 'MCD',
    //     description : "McDonald’s, «Макдо́налдс» — американская корпорация, работающая в сфере общественного питания, крупнейшая в мире сеть ресторанов быстрого питания, работающая по системе франчайзинга.  ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/mcdonalds--600.png",
    // },{
    //     ticker: 'GE',
    //     description : "General Electric — американская многоотраслевая корпорация, производитель многих видов техники, включая локомотивы, энергетические установки , газовые турбины, авиационные двигатели, медицинское оборудование, фототехнику, бытовую и осветительную технику, пластмассы и герметики, а также широкий спектр продукции военного назначения, от стрелкового оружия и бронетехники до военно-космических систем и ядерных боеголовок ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/general-electric--600.png",
    // },
    // {
    //     ticker: 'HON',
    //     description : "Honeywell — американская корпорация, производящая электронные системы управления и автоматизации. Основные направления — аэрокосмическое оборудование, технологии для эксплуатации зданий и промышленных сооружений, автомобильное оборудование, турбокомпрессоры. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/honeywell--600.png",
    // },{
    //     ticker: 'MDT',
    //     description : "Medtronic plc — один из крупнейших производителей медицинского оборудования. В 2015 году компания Medtronic объявила об успешном завершении приобретения Covidien plc. В соответствии с условиями договора о приобретении, Medtronic, Inc. и Covidien plc объединены в компанию Medtronic plc. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/medtronic--600.png",
    // },{
    //     ticker: 'ABT',
    //     description : "Abbott Laboratories — американская химико-фармацевтическая корпорация. Входит в список Fortune 500. История компании начата в 1888 году, когда доктор Уоллас Эбботт в Чикаго начал производство лекарств. Первое название компании — Abbott Alkaloidal Company, современное название — c 1915 года. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/abbott--600.png",
    // },{
    //     ticker: 'TXN',
    //     description : "Texas Instruments — американская компания, производитель полупроводниковых приборов, микросхем, электроники и изделий на их основе. Расположена в Далласе. Является 4-м в мире по размеру производителем полупроводниковых приборов, уступая лишь Intel, Samsung и Toshiba. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/texas-instruments--600.png",
    // },{
    //     ticker: 'BMY',
    //     description : " ristol Myers Squibb (BMS) - американская транснациональная фармацевтическая компания со штаб-квартирой в Нью-Йорке. BMS - одна из крупнейших фармацевтических компаний в мире, которая неизменно входит в список Fortune 500 крупнейших корпораций США. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/bristol-myers-squibb--600.png",
    // },{
    //     ticker: 'ADBE',
    //     description : "Adobe, Inc. — американская компания — разработчик программного обеспечения. Штаб-квартира расположена в Сан-Хосе. В 2011 году почти 100 % акций в свободном обращении. Крупнейшие акционеры: Primecap Management Company, Valueact Holdings LP и Bank of New York Mellon Corporation ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/adobe--600.png",
    // },{
    //     ticker: 'UNP',
    //     description : "Union Pacific Corporation - публичная железнодорожная холдинговая компания. Она была зарегистрирована в Юте в 1969 году, ее штаб-квартира находится в Омахе, штат Небраска. Это материнская компания существующей, зарегистрированной в Делавэре, формы Union Pacific Railroad. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/union-pacific--600.png",
    // },{
    //     ticker: 'GILD',
    //     description : "Gilead Sciences, Inc. - американская биофармацевтическая компания со штаб-квартирой в Фостер-Сити, штат Калифорния, которая занимается исследованием и разработкой противовирусных препаратов, используемых для лечения ВИЧ, гепатита B, гепатита C и гриппа, включая Harvoni и Sovaldi. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/gilead--600.png",
    // },{
    //     ticker: 'BKNG',
    //     description : "Booking Holdings Inc. - американская технологическая компания для путешествий, основанная в Делавэре и базирующаяся в Норуолке, Коннектикут, которая владеет и управляет несколькими агрегаторами тарифов на поездки и метапоисковыми системами, включая одноименные и флагманские Booking.com, Priceline.com, Agoda.com ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/booking--600.png",
    // },{
    //     ticker: 'AVGO',
    //     description : "Broadcom Inc. — американская компания по разработке полупроводниковой продукции со штаб-квартирой в Сан-Хосе. На счету компании более 5000 патентов.  ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/broadcom--600.png",
    // },{
    //     ticker: 'ACN',
    //     description : "Accenture — консалтинговая компания, оказывающая услуги организациям по консультированию в сферах стратегического планирования, оптимизации и организации аутсорсинга бизнес-процессов, управления взаимоотношениями с клиентами, управления логистическими процессами, управления персоналом, внедрения информационных технологий. Компания ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/accenture--600.png",
    // },
    // {
    //     ticker: 'UTX', ----------------------
    //     description : "United Technologies — одна из крупнейших финансово-промышленных групп США. Штаб-квартира — в Хартфорде, штат Коннектикут. Около половины доходов от продаж продукции и предоставляемых услуг составляет федеральный клиентский сектор обслуживания военных заказов. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/united-technologies--600.png",
    // },
    // {
    //     ticker: 'GS',
    //     description : "Goldman Sachs Group, «Го́лдман Сакс груп» — один из крупнейших в мире инвестиционных банков, являющийся финансовым конгломератом, в кругу финансистов известен как «The Firm», занимается инвестиционным банкингом, торговлей ценными бумагами, инвестиционным менеджментом и другими финансовыми услугами ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/goldman-sachs--600.png",
    // },{
    //     ticker: 'SLB',
    //     description : "Schlumberger — крупнейшая нефтесервисная компания. Штаб-квартиры компании расположены в Хьюстоне и в Париже. Зарегистрирована компания на Нидерландских Антильских островах. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/schlumberger--600.png",
    // },{
    //     ticker: 'CAT',
    //     description : "Caterpillar Inc., «Ка́терпиллар» — американская компания, один из крупнейших мировых производителей строительной и горнодобывающей техники. Выпускает землеройно-транспортную технику, строительное оборудование, дизельные двигатели, энергетические установки и другие продукты. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/caterpillar--600.png",
    // },{
    //     ticker: 'PYPL',
    //     description : "PayPal — крупнейшая дебетовая электронная платёжная система. Позволяет клиентам оплачивать счета и покупки, отправлять и принимать денежные переводы. С октября 2002 года является подразделением компании eBay. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/paypal--600.png",
    // },{
    //     ticker: 'QCOM',
    //     description : "Qualcomm — компания по разработке и исследованию беспроводных средств связи, а также SoC, расположенная в Сан-Диего, Калифорния, США. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/qualcomm--600.png",
    // },{
    //     ticker: 'CRM',
    //     description : "Salesforce — американская компания, разработчик одноимённой CRM-системы, предоставляемой заказчикам исключительно по модели SaaS. Под наименованием Force.com компания предоставляет PaaS-систему для самостоятельной разработки приложений, а под брендом Database.com — облачную систему управления базами данных. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/salesforce-com--600.png",
    // },{
    //     ticker: 'NKE',
    //     description : "Nike, Inc. — американская транснациональная компания, специализирующаяся на спортивной одежде и обуви. Штаб-квартира — в городе Бивертон. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/nike--600.png",
    // },{
    //     ticker: 'TMO',
    //     description : "Thermo Fisher Scientific - американский поставщик научного оборудования, реагентов, расходных материалов и программного обеспечения. Компания Thermo Fisher, базирующаяся в Уолтеме, штат Массачусетс, была образована в результате слияния компаний Thermo Electron и Fisher Scientific в 2006 году ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/thermo-fisher-scientific--600.png",
    // },{
    //     ticker: 'USB',
    //     description : "U.S. Bancorp — американская финансовая холдинговая компания, базирующаяся в Миннеаполисе, штат Миннесота, основной структурой холдинга является U.S. Bank, 5-й по размеру активов коммерческий банк США. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/us-bancorp--600.png",
    // },{
    //     ticker: 'SBUX',
    //     description : "Starbucks Corporation, «Стáрбакс» — американская компания по продаже кофе и одноимённая сеть кофеен. Основана в Сиэтле в 1971 году. На сентябрь 2018 года сеть Starbucks объединяла свыше 29 тысяч торговых точек в 75 странах мира. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/starbucks--600.png",
    // },
    // {
    //     ticker: 'LMT',
    //     description : "Lockheed Martin Corporation — американская военно-промышленная корпорация, специализирующаяся в области авиастроения, авиакосмической техники, судостроения, автоматизации почтовых служб и аэропортовой инфраструктуры и логистики. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/lockheed-martin--600.png",
    // },{
    //     ticker: 'COST',
    //     description : "Costco Wholesale Corporation — крупнейшая в мире сеть складов самообслуживания клубного типа. Пятое по величине продаж розничное торговое предприятие в США. Компания занимает 18-е место в Fortune Global 500 ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/costco-wholesale--600.png",
    // },{
    //     ticker: 'MS',
    //     description : "Morgan Stanley — американский финансовый конгломерат. Базируется в Нью-Йорке. Владеет крупнейшим брокерским бизнесом в мире. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/morgan-stanley--600.png",
    // },{
    //     ticker: 'PNC',
    //     description : "PNC Financial Services Group — американская финансовая корпорация. PNC осуществляет свою деятельность в девятнадцати штатах США и округе Колумбия, имеет 2460 отделений, 9000 банкоматов, обслуживает компании и государственные учреждения, а также управляет активами различных предприятий. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/pnc-financial--600.png",
    // },{
    //     ticker: 'LLY',
    //     description : "Eli Lilly and Company — американская фармацевтическая компания. Была основана в 1876 году в Индианаполисе, где по-прежнему располагается её штаб-квартира. Известна как первая компания, начавшая промышленное производство инсулина. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/eli-lilly--600.png",
    // },{
    //     ticker: 'UPS',
    //     description : "United Parcel Service, Inc., или UPS, — американская компания, специализирующаяся на экспресс-доставке и логистике. Штаб-квартира компании расположена в Атланте. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/united-parcel--600.png",
    // },
    // {
    //     ticker: 'TWX', ---
    //     description : "WarnerMedia (до 2018 года — Time Warner Inc.) — один из крупнейших в мире конгломератов новостного и развлекательного профиля. Time Warner образовалась путём слияния Warner Communications Inc. и Time Inc. ",
    //     avatar : "https://www.logolynx.com/images/logolynx/79/794c0a35d7a4316c9025455cf6d868f8.png",
    // },
    // {
    //     ticker: 'NEE',
    //     description : "NextEra Energy, Inc. — энергетическая компания из списка Fortune 200 с генерирует около 45 900 мегаватт электроэнергии, имеет выручку более 17 миллиардов долларов за 2017 год. Включает в себя следующие дочерние компании Florida Power & Light, NextEra Energy Resources, NextEra Energy Partners и NextEra Energy Services. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/nextera-energy--600.png",
    // },
    // {
    //     ticker: 'CELG', ----
    //     description : "Celgene Corporation - фармацевтическая компания, производящая противораковые и иммунологические препараты. Его основным продуктом является ревлимид, который используется при лечении множественной миеломы, а также при некоторых анемиях. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/celgene--600.png",
    // },
    // {
    //     ticker: 'LOW',
    //     description : "Lowe’s — американская компания розничной торговли, владеющая сетью магазинов по продаже товаров для улучшения жилища. Компания была основана в 1946 году в городе Норт-Уилксборо, Северная Каролина. Штаб-квартира располагается в Мурсвилле, Северная Каролина. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/lowe-s--600.png",
    // },{
    //     ticker: 'BLK',
    //     description : "BlackRock, Inc. — международная инвестиционная компания со штаб-квартирой в Нью-Йорке. Одна из крупнейших инвестиционных компаний мира и крупнейшая в мире по размеру активов под управлением. Размер активов под управлением — $9 трлн на 15 августа 2021 года ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/blackrock--600.png",
    // },
    // {
    //     ticker: 'CVS',
    //     description : "CVS Health — один из крупнейших в США поставщиков рецептурных препаратов. Компания управляет сетью из почти 10 тысяч аптек. Штаб-квартира компании располагается в Вунсокете, штат Род-Айленд. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/cvs-health--600.png",
    // },{
    //     ticker: 'AXP',
    //     description : "American Express — американская финансовая компания. Известными продуктами компании являются кредитные карты, платежные карты и дорожные чеки. Штаб-квартира компании находится в Нью-Йорке. Входит в двадцатку крупнейших банков США. Около трети выручки приходится на зарубежные операции ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/american-express--600.png",
    // },{
    //     ticker: 'MU',
    //     description : "Micron Technology — американская транснациональная корпорация, известная своей полупроводниковой продукцией, основную часть которой составляют чипы памяти DRAM и NAND, флеш-память, SSD-накопители, а также датчики CMOS ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/micron-technology--600.png",
    // },{
    //     ticker: 'CHTR',
    //     description : "Charter Communications, Inc. - американская телекоммуникационная компания и компания средств массовой информации, предоставляющая услуги под торговой маркой Charter Spectrum. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/charter--600.png",
    // },{
    //     ticker: 'SCHW',
    //     description : "Charles Schwab Corporation — банковская и брокерская компания, расположенная в Уэстлейк, Техас. Была основана в 1971 году Чарльзом Р. Швабом. Входит в список крупнейших банковских компаний США и является одной из крупнейших брокерских компаний в Соединенных Штатах. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/schwab--600.png",
    // },{
    //     ticker: 'MDLZ',
    //     description : "Mondelēz International — американская транснациональная компания, производитель продуктов питания, образованная в 2012 году в результате разделения Kraft Foods. Штаб-квартира — в Дирфилде. Более трёх четвертей выручки даёт деятельность вне США. Вторая по размеру кондитерская компания в мире на 2017 год. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/mondelez--600.png",
    // },{
    //     ticker: 'CB',
    //     description : "CE Limited является холдинговой компанией группы ACE Group of Companies. Штаб-квартира в Цюрихе, Швейцария. АСЕ предоставляет широкий спектр страховых и перестраховочных продуктов. Ведёт операции в 53 странах мира и имеет право на ведение бизнеса в 140 странах. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/chubb--600.png",
    // },{
    //     ticker: 'COP',
    //     description : "ConocoPhillips — американская нефтяная компания со штаб-квартирой в Хьюстоне, штат Техас. По итогам 2011 года занимала 12 место в Fortune Global 500 ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/conocophillips--600.png",
    // },{
    //     ticker: 'AMAT',
    //     description : "Applied Materials, Inc. — американская компания, поставляющая оборудование, услуги и программное обеспечение для производства полупроводниковых (интегральных) микросхем в области электроники, плоскопанельных дисплеев для компьютеров, смартфонов и телевизоров, а также продукции, работающей за счёт солнечной энергии.  ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/applied-materials--600.png",
    // },{
    //     ticker: 'DHR',
    //     description : "Danaher Corporation - американский глобально диверсифицированный конгломерат со штаб-квартирой в Вашингтоне, округ Колумбия.Компания разрабатывает, производит и продает профессиональные, медицинские, промышленные и коммерческие продукты и услуги. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/danaher--600.png",
    // },{
    //     ticker: 'AMT',
    //     description : "American Tower Corporation — американская компания, крупнейший оператор инфраструктуры беспроводной связи в Северной Америке. Основана в 1995 г. Штаб-квартира в Бостоне, штат Массачусетс. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/american-tower--600.png",
    // },
    // {
    //     ticker: 'CL',
    //     description : "Colgate-Palmolive Company — международная компания, производящая такие продукты, как мыло, средства для гигиены рта, зубные пасты и щётки, корма для домашних животных, бытовую химию. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/colgate-palmolive--600.png",
    // },{
    //     ticker: 'GD',
    //     description : "General Dynamics Corporation — американская компания, один из крупнейших мировых производителей военной и аэрокосмической техники. Более двух третей доходов от продаж продукции и предоставляемых услуг составляет федеральный клиентский сектор обслуживания военных заказов.",
    //     avatar : "https://s3-symbol-logo.tradingview.com/general-dynamics--600.png",
    // },{
    //     ticker: 'FDX',
    //     description : "FedEx Corporation — американская компания, предоставляющая почтовые, курьерские и другие услуги логистики по всему миру. Входит в список Fortune 1000 по итогам 2012 года. Компания была основана в 1971 году в Литл-Рок под названием Federal Express. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/fedex--600.png",
    // },{
    //     ticker: 'WBA',
    //     description : "Walgreens Boots Alliance — крупнейшая в мире аптечная компания. Штаб-квартира в городе Дирфилд. Среди принадлежащих компании брендов — No7, Botanics, Liz Earle, Soap & Glory. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/walgreens-boots-alliance--600.png",
    // },{
    //     ticker: 'NOC',
    //     description : "Northrop Grumman Corporation — американская военно-промышленная компания, работающая в области электроники и информационных технологий, авиакосмической отрасли, судостроении. Образована в 1994 году в результате слияния компаний «Northrop Corporation» и «Grumman Corporation» ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/northrop-grumman--600.png",
    // },{
    //     ticker: 'BIIB',
    //     description : "Biogen Inc. - американская многонациональная биотехнологическая компания, базирующаяся в Кембридже, штат Массачусетс, специализирующаяся на открытии, разработке и предоставлении методов лечения неврологических заболеваний пациентам по всему миру. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/biogen--600.png",
    // },{
    //     ticker: 'BDX',
    //     description : "Becton Dickinson — американская медицинская технологическая компания, производящая и продающая медицинские приборы, инструменты, реагенты. Компания основана в 1897 году Максвеллом Бектоном и Фарли Дикинсоном. Штаб-квартира компании расположена в районе Franklin Lakes округа Берген штат Нью-Джерси, США. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/becton-dickinson--600.png",
    // },{
    //     ticker: 'ANTM',
    //     description : "Anthem, Inc. — крупная американская компания, оказывающая услуги медицинского страхования. Штаб-квартира компании располагается в Индианаполисе, Индиана. Компания занимала 135-е место в списке Fortune Global 500 за 2011 год.  ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/anthem--600.png",
    // },{
    //     ticker: 'EOG',
    //     description : "EOG Resources — крупный независимый американский производитель нефти и природного газа. Штаб-квартира компании базируется в Хьюстоне, штат Техас. Компания ведёт добычу в США, Канаде, Тринидаде и Тобаго и в Северном море ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/eog--600.png",
    // },{
    //     ticker: 'BK',
    //     description : "The Bank of New York Mellon — американская холдинговая компания; образовалась в 2007 году в результате слияния The Bank of New York и Mellon Financial Corporation. Размер депозитарных активов — $41,1 трлн, размер активов под администрированием — $3,5 трлн, размер активов под управлением — $2,2 трлн на конец 2020 года. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/bank-of-new-york-mellon--600.png",
    // },
    // {
    //     ticker: 'ATVI',
    //     description : "Activision Blizzard, Inc. — американская компания, одна из крупнейших в сфере компьютерных игр и развлечений со штаб-квартирой в Санта-Монике, Калифорния. Была основана в 2008 году в результате слияния Vivendi Games и Activision. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/activision-blizzard--600.png",
    // },{
    //     ticker: 'CME',
    //     description : "CME Group Inc. — крупнейший североамериканский рынок финансовых деривативов, построенный путём объединения ведущих бирж Чикаго и Нью-Йорка. Группа была образована в 2007 году путём слияния Чикагской товарной биржи и Чикагской торговой палаты. Штаб-квартира организации находится в центре Чикаго. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/cme--600.png",
    // },{
    //     ticker: 'SYK',
    //     description : "Stryker Corporation - американская многонациональная корпорация в области медицинских технологий, базирующаяся в Каламазу, штат Мичиган. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/stryker--600.png",
    // },{
    //     ticker: 'DUK',
    //     description : "Duke Energy Corporation - американская холдинговая компания по производству электроэнергии и природного газа со штаб-квартирой в Шарлотте, Северная Каролина. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/duke-energy--600.png",
    // },{
    //     ticker: 'ITW',
    //     description : "Illinois Tool Works - это американская промышленная корпорация, осуществляет международную деятельность в разных странах мира, включая США, Канаду и Новую Зеландию, является производителем различного технического оборудования использующегося в пищевой отрасли, строиетльстве и автомобилестроении ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/illinois-tool-works--600.png",
    // },{
    //     ticker: 'ADP',
    //     description : "Automatic Data Processing, Inc — американская компания, являющаяся поставщиком программного обеспечения и услуг для управления человеческими ресурсами ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/automatic-data-processing--600.png",
    // },{
    //     ticker: 'TJX',
    //     description : "TJX Companies, Inc. - американская транснациональная корпорация дешевых универмагов со штаб-квартирой в Фрамингеме, штат Массачусетс. Она была образована как дочерняя компания Zayre Corp. в 1987 году и стала правопреемником Zayre Corp. после реорганизации компании в 1989 году. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/tjx-cos--600.png",
    // },{
    //     ticker: 'DE',
    //     description : "Deere & Company — американская машиностроительная компания, выпускающая сельскохозяйственную, строительную и лесозаготовительную технику. Крупнейший в мире производитель сельскохозяйственной техники. Штаб-квартира компании расположена в городе Молин ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/deere--600.png",
    // },{
    //     ticker: 'CSX',
    //     description : " ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/csx--600.png",
    // },{
    //     ticker: 'SPGI',
    //     description : "S&P Global — американский медиахолдинг. Занимается издательской деятельностью, оказанием финансовых и бизнес-услуг. До мая 2013 года медиахолдинг назывался The McGraw-Hill Companies, Inc., с 2013 по 27 апреля 2016 г. медиахолдинг назывался McGraw Hill Financial. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/s-and-p-global--600.png",
    // },
    // {
    //     ticker: 'AIG',
    //     description : "American International Group, Inc. — международная страховая и финансовая корпорация, действующая более чем в 80 странах мира. Один из мировых лидеров в области личного и имущественного страхования. Компании, входящие в группу AIG, предоставляют услуги государственным учреждениям, юридическим лицам и частным клиентам. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/american-international-group--600.png",
    // },{
    //     ticker: 'MET',
    //     description : "MetLife, Inc., сокращённо от Metropolitan Life Insurance Company, Inc. — ведущий международный холдинг в сфере страхования и пенсионного обеспечения. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/metlife--600.png",
    // },{
    //     ticker: 'CTSH',
    //     description : "Cognizant - американская транснациональная технологическая компания, предоставляющая услуги бизнес-консалтинга, информационных технологий и аутсорсинга. Штаб-квартира находится в Тинеке, Нью-Джерси, США. Cognizant является частью NASDAQ-100 и торгуется под CTSH. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/cognizant--600.png",
    // },{
    //     ticker: 'OXY',
    //     description : "Occidental Petroleum Corporation — американская нефтяная компания. Штаб-квартира — в Лос-Анджелесе. Компания занимает 491 место в Fortune Global 500. Основана в 1920 году. На протяжении долгих лет компанию возглавлял широко известный в СССР Арманд Хаммер, также известный своим участием в скандале «Уотергейт» ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/occidental-petroleum--600.png",
    // },{
    //     ticker: 'ISRG',
    //     description : " Intuitive Surgical, Inc. - американская корпорация, которая разрабатывает, производит и продает роботизированные продукты, предназначенные для улучшения клинических результатов пациентов с помощью минимально инвазивной хирургии, прежде всего с хирургической системой da Vinci.",
    //     avatar : "https://s3-symbol-logo.tradingview.com/intuitive-surgical--600.png",
    // },{
    //     ticker: 'SPG',
    //     description : " Simon Property Group, Inc. - американский инвестиционный фонд недвижимости, инвестирующий в торговые центры, аутлет-центры и общественные центры и центры стиля жизни. Это крупнейший владелец торговых центров в Соединенных Штатах, его штаб-квартира находится в Индианаполисе, штат Индиана",
    //     avatar : "https://dvh1deh6tagwk.cloudfront.net/finder-us/wp-uploads/sites/3/2019/07/SimonPropertyGroupLogo_Supplied_250x250.png",
    // },{
    //     ticker: 'GM',
    //     description : " General Motors — крупнейшая американская автомобильная корпорация, до 2008 года на протяжении 77 лет была крупнейшим производителем автомобилей в мире. По результатам 2014 года концерн занимал третье место в мире по количеству проданных автомобилей.  ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/general-motors--600.png",
    // },{
    //     ticker: 'COF',
    //     description : "Capital One Financial Corporation — американская банковская холдинговая компания, специализирующаяся на кредитных картах и автокредитах; холдинг включает две основные структуры, Capital One Bank и Capital One и входит в десятку крупнейших банков США ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/capital-one--600.png",
    // },{
    //     ticker: 'PRU',
    //     description : "Prudential Financial — американская страховая и инвестиционная компания. Размер активов под управлением $1,3 трлн на 2017 год. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/prudential--600.png",
    // },
    // {
    //     ticker: 'D',
    //     description : "Dominion Resources Inc. — американская электроэнергетическая компания, занимающаяся электроснабжением в Виргинии и Северной Каролине, а также газоснабжением в Западной Виргинии, Огайо, Пенсильвании и восточной части Северной Каролины ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/dominion-energy--600.png ",
    // },{
    //     ticker: 'EMR',
    //     description : "Emerson — крупная транснациональная корпорация, головной офис в городке Фергусон, штат Миссури. Входит в список 500 крупнейших компаний мира. Компания совмещает технологию и инжиниринг во многих отраслях промышленности и предлагает технологические решения для промышленных, коммерческих и потребительских рынков ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/emerson--600.png ",
    // },{
    //     ticker: 'ICE',
    //     description : "Intercontinental Exchange — сеть бирж и клиринговых палат для финансовых и товарных рынков в США, Канаде и Европе, крупнейший в мире оператор срочного рынка, где торгуются фьючерсные контракты на все виды базовых активов: энергоносители, валюты, драгоценных металлы и пр., на её торговых площадках сосредоточено 50% ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/intercontinental-exchange--600.png ",
    // },{
    //     ticker: 'VRTX',
    //     description : "Vertex Pharmaceuticals, Inc. - американская биофармацевтическая компания, базирующаяся в Бостоне, штат Массачусетс. Это была одна из первых биотехнологических фирм, которая использовала четкую стратегию рационального конструирования лекарств, а не комбинаторной химии. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/vertex-pharmaceutical--600.png ",
    // },{
    //     ticker: 'SO',
    //     description : "Southern Company – американская электроэнергетическая компания. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/southern--600.png ",
    // },{
    //     ticker: 'ESRX',
    //     description : "Texas Instruments — американская компания, производитель полупроводниковых приборов, микросхем, электроники и изделий на их основе. Расположена в Далласе. Является 4-м в мире по размеру производителем полупроводниковых приборов, уступая лишь Intel, Samsung и Toshiba. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/texas-instruments--600.png ",
    // },{
    //     ticker: 'MMC',
    //     description : "Marsh McLennan - международная фирма, оказывающая профессиональные услуги, со штаб-квартирой в Нью-Йорке и занимающаяся страховыми брокерскими операциями, управлением рисками, услугами перестрахования, управлением талантами, инвестиционным консультированием и управленческим консалтингом. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/marsh-and-mclennan--600.png ",
    // },{
    //     ticker: 'MAR',
    //     description : "Marriott International — международная компания по управлению гостиничными сетями со штаб-квартирой в([ˈmærɪət ˌɪntəˈnæʃənl]), «Ма́рриотт интернэ́шнл» США. Оказывает услуги по управлению 7300 гостиницами общей вместимостью 1,9 млн номеров под 30 брендами в 120 странах мира (на 2019 год).  ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/marriott--600.png ",
    // },{
    //     ticker: 'INTU',
    //     description : "Intuit Inc. - американская компания, специализирующаяся на финансовом программном обеспечении. Штаб-квартира компании находится в Маунтин-Вью, Калифорния, генеральным директором является Сасан Гударзи. По состоянию на 2019 год более 95% доходов и доходов поступает от деятельности в Соединенных Штатах. ",
    //     avatar : "https://smart-lab.ru/uploads/articles/00/51/14/thumbnail.webp ",
    // },{
    //     ticker: 'F',
    //     description : "Ford — американская автомобилестроительная компания, производитель автомобилей под маркой Ford. Четвёртый в мире производитель автомобилей по объёму выпуска за весь период существования; в настоящее время — третий на рынке США после GM и Toyota, и второй в Европе после Volkswagen.  ",
    //     avatar : " https://s3-symbol-logo.tradingview.com/ford--600.png",
    // },{
    //     ticker: 'EBAY',
    //     description : "eBay Inc. — американская компания, предоставляющая услуги в областях интернет-аукционов и интернет-магазинов. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/ebay--600.png ",
    // },{
    //     ticker: 'ZTS',
    //     description : "Zoetis Inc. - американская фармацевтическая компания, крупнейший в мире производитель лекарств и вакцин для домашних животных и скота. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/zoetis--600.png ",
    // },{
    //     ticker: 'NSC',
    //     description : "The Norfolk Southern Railway ( отчетность марка NS ) является класс I грузовой железной дороги в Соединенных Штатах . Со штаб квартирой в Атланте, штат Джорджия , компания работает 19,420 маршрутные миль (31250 км) в 22 восточных штатах, то округ Колумбия , и имеет права в Канаде над Олбани в Монреале маршрута Канадской Тихоокеанской железной дороги , и ранее на CN от Буффало до Сент-Томаса .  ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/norfolk-southern--600.png ",
    // },{
    //     ticker: 'VLO',
    //     description : "Valero Energy Corporation — американская вертикально интегрированная нефтяная компания со штаб-квартирой в Сан-Антонио, штат Техас. В 2011 году компания занимала 70 место в Fortune Global 500. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/valero-energy--600.png ",
    // },{
    //     ticker: 'CI',
    //     description : "Cigna - американская многонациональная управляемая медицинская и страховая компания, базирующаяся в Блумфилде, штат Коннектикут. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/cigna--600.png ",
    // },{
    //     ticker: 'PSX',
    //     description : "омпания Phillips 66 - американская многонациональная энергетическая компания со штаб-квартирой в Уэстчейз, Хьюстон, штат Техас. Она дебютировала как независимая энергетическая компания, когда ConocoPhillips выполнила выделение своих активов в нижнем и среднем уровнях. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/phillips-66--600.png ",
    // },{
    //     ticker: 'HAL',
    //     description : "Halliburton — американская транснациональная корпорация, одна из крупнейших в мире компаний, оказывающих сервисные услуги в нефте- и газодобывающей отрасли. Компания предоставляет свои услуги в более чем 80 странах по всему миру, в её состав входят сотни дочерних и зависимых обществ, подразделений и филиалов. ",
    //     avatar : "https://s3-symbol-logo.tradingview.com/halliburton--600.png ",
    // },{
    //     ticker: 'IVZ',
    //     description : "Invesco — американская инвестиционная компания, входящая в число крупнейших в мире. Основной регион деятельности — США, компания представлена более, чем в 20 странах мира, обслуживает клиентов в Северной Америке, Европе, на Ближнем Востоке и в азиатско-тихоокеанском регионе.",
    //     avatar : "https://s3-symbol-logo.tradingview.com/invesco--600.png",
    // },
    // {
    //     ticker: 'AGNC',
    //     description : "AGNC Investment Corp основанна в 2008 году, представляет собой с инвестиционный фонд недвижимости внутренним управлением («REIT»). Инвестирует преимущественно в агентские ценные бумаги, обеспеченные ипотекой, на основе использования заемных средств, финансируемых в основном за счет обеспеченных займов, структурированных как соглашения РЕПО.",
    //     avatar : "https://s3-symbol-logo.tradingview.com/agnc-investment--600.png",
    // },
    {
        ticker: 'OKE',
        description : "Oneok, Inc. - американская диверсифицированная корпорация, специализирующаяся в первую очередь на газовой промышленности, со штаб-квартирой в Талсе, штат Оклахома. Компания входит в списки Fortune 500 и S&P 500.",
        avatar : "https://s3-symbol-logo.tradingview.com/oneok--600.png",
    },
];

a.forEach(async (i) => {
    await app(i)
})

// mongoose.disconnect(); 

