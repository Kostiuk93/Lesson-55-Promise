'use strict';

console.log('Запрос данных...');

//Promise - обещание
// resolve - обещание выполнилось, reject - обещание не выполнилось, что то пошло не так
//resolve(value) — если работа завершилась успешно, с результатом value.
//reject(error) — если произошла ошибка, error – объект ошибки.
const req = new Promise((resolve, reject) => {       
    setTimeout( () => {
        console.log('Подготовка данных...');
    
        const product = {
            name: 'TV',
            price: 200
        };
    
        resolve(product);
    }, 2000);
});
// проверка правдивого исхода 
// так как переменной product не существует в req.then(), то помещаем её в resolve(product) и req.then((product))...чтобы её значение передалось дальше в метод .then() 

req.then((product) => {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            product.status = 'Order';
            resolve(product);
        }, 2000);
    });
}).then(data => {
    data.modify = true;
    return data;
}).then((data) => {
    console.log(data);
}).catch(() => {
    console.error('Произошла ошибка');
}).finally(() => {
    console.log('Finally');
});

// ПРИМЕР: когда мы запускаем промис отправки формы, то в участке кода:
// - .then() происходит успешная отправка формы;
// - .catch() если произошла ошибка
// - .finally() очистка формы, участок кода, который всегда будет выполняться


//___________________________________________________________________________________________
/* req.then((product) => {
    const req2 = new Promise((resolve, reject) => {
        setTimeout( () => {
            product.status = 'Order';
            resolve(product);
        }, 2000);
    });
    req2.then(data => {
        console.log(data);
    });
}); */


/* Первый аргумент метода .then – функция, которая выполняется, когда промис переходит в состояние «выполнен успешно», и получает результат.
Второй аргумент .then – функция, которая выполняется, когда промис переходит в состояние «выполнен с ошибкой», и получает ошибку. */


// Колбек функция
/* setTimeout( () => {
    console.log('Подготовка данных...');

    const product = {
        name: 'TV',
        price: 200
    };

    setTimeout( () => {
        product.status = 'Order';
        console.log(product);
    }, 2000);
}, 2000); */

const test = time => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), time);
    });
}

test(1000).then(() => console.log('1s'));
test(1500).then(() => console.log('1.5s'));


// Promis.all([]) - вмещает в себя массив промисов и проверяет правильное выполнение всех промисов в массиве.
Promise.all([test(1000), test(1500)]).then(() => {
    console.log('all');
});

// Promis.race([]) - вмещает в себя массив промисов и проверяет правильное выполнение первого промиса в массиве.
Promise.race([test(1000), test(1500)]).then(() => {
    console.log('all');
});