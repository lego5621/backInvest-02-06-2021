const app = require('../libs/NewAddNewCompany.js');

const mongoose = require('mongoose');
require('../models/Company');

mongoose.promise = global.Promise;

mongoose.connect("mongodb+srv://Oleg:zcxvcbvn123456@cluster0.q5cib.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true });



let a =[
    {
        ticker: 't',
        description : "AT&T Inc — американский транснациональный телекоммуникационный конгломерат со штаб-квартирой в Далласе, штат Техас. Крупнейшая в мире телекоммуникационная компания и один из крупнейших медиаконгломератов. Является крупнейшим поставщиком как местной, так и дальней телефонной связи в США, а также вторым по величине сотовым оператором в США.",
        avatar : "https://s3-symbol-logo.tradingview.com/at-and-t--600.png",
    },{
        ticker: 'aapl',
        description : "Apple  — американская корпорация, производитель персональных и планшетных компьютеров, аудиоплееров, смартфонов, программного обеспечения. Один из пионеров в области персональных компьютеров и современных многозадачных операционных систем с графическим интерфейсом. ",
        avatar : "https://s3-symbol-logo.tradingview.com/apple--600.png",
    },
    {
        ticker: 'MSFT',
        description : "Ма́йкрософт — одна из крупнейших транснациональных компаний по производству проприетарного программного обеспечения для различного рода вычислительной техники — персональных компьютеров, игровых приставок, КПК, мобильных телефонов и прочего.",
        avatar : "https://pngimg.com/uploads/microsoft/small/microsoft_PNG18.png",
    }
    ,{
        ticker: 'AMZN',
        description : "Amazon — американская компания, крупнейшая в мире на рынках платформ электронной коммерции и публично-облачных вычислений по выручке и рыночной капитализации. Штаб-квартира — в Сиэтле.",
        avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwbuxuwbaXRDxm5YXe3xzsln4k6vytVkqBxZYQuLC6a66Iwar1scNemxBUeoly8V5wmHw&usqp=CAU",
    },{
        ticker: 'XOM',
        description : "Exxon Mobil Corporation — американская компания, одна из крупнейших нефтяных компаний в мире, одна из крупнейших корпораций в мире по размеру рыночной капитализации. Штаб-квартира компании расположена в городе Ирвинг, пригород Далласа, штат Техас.",
        avatar : "https://smart-lab.ru/uploads/articles/00/32/43/thumbnail.webp",
    },{
        ticker: 'FB',
        description : "Facebook — крупнейшая социальная сеть в мире и одноимённая компания Facebook, Inc., владеющая ею. Была основана 4 февраля 2004 года Марком Цукербергом и его соседями по комнате во время обучения в Гарвардском университете — Эдуардо Саверином, Дастином Московицем и Крисом Хьюзом.",
        avatar : "https://pyxis.nymag.com/v1/imgs/11d/582/c7b0487c6e26db4f5be6eb679e3620d2ce-facebook.rsquare.w1200.jpg",
    }
    ,{
        ticker: 'JPM',
        description : "JPMorgan Chase, «Джей Пи Морган Чейс» — американский финансовый холдинг, образовавшийся в результате слияния нескольких крупных банков США. Штаб-квартира банка находится в Нью-Йорке, на Манхэттене. Входит в «большую четвёрку» банков США, наряду с Bank of America, Citigroup и Wells Fargo.",
        avatar : "https://smart-lab.ru/uploads/articles/00/35/52/thumbnail.webp",
    },{
        ticker: 'JNJ',
        description : "Johnson & Johnson, «Джонсон энд Джонсон» — американская холдинговая компания, возглавляющая группу из более чем 250 дочерних компаний по всему миру, производящих лекарственные препараты, санитарно-гигиенические товары и медицинское оборудование.",
        avatar : "https://pbs.twimg.com/profile_images/1101560913885315074/9KHsZD7M_400x400.png",
    },{
        ticker: 'GOOG',
        description : "Alphabet Inc. — холдинг, располагающийся в Калифорнии. Владеет несколькими компаниями, ранее принадлежавшими Google Inc, и самой Google Inc в том числе. В 2018 году заняла первое место в списке 500 лучших работодателей мира по мнению журнала Forbes.",
        avatar : "https://c0.klipartz.com/pngpicture/869/485/gratis-png-logo-de-google-iconos-de-computadora-google.png",
    },{
        ticker: 'BAC',
        description : "Bank of America, «Бэнк ов Америка», Банк Америки — американский финансовый конгломерат, оказывающий широкий спектр финансовых услуг частным и юридическим лицам. Входит в четвёрку крупнейших банков США, наряду с Citigroup, Wells Fargo и JPMorgan Chase.",
        avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgtCABoe9E-0I18DIcS-DtsV71oQ0cpZbRWA&usqp=CAU",
    },{
        ticker: 'INTC',
        description : "Intel — американская компания, разработчик и производитель электронных устройств и компьютерных компонентов: микропроцессоров и наборов системной логики для клиентских вычислительных систем и для дата-центров, ПЛИС, чипов для систем искусственного интеллекта и для интернета вещей, энергонезависимой памяти.",
        avatar : "https://s3-symbol-logo.tradingview.com/intel--600.png",
    }
];

a.forEach(async (i) => {
    await app(i)
})

// mongoose.disconnect(); 

