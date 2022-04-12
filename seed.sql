DROP DATABASE IF EXISTS MERCHANT;

CREATE DATABASE MERCHANT;

USE MERCHANT;

create or replace table Addresses
(
    id        int auto_increment
        primary key,
    street    varchar(255) not null,
    province  varchar(255) not null,
    country   varchar(255) not null,
    zip       varchar(255) not null,
    phone     varchar(255) not null,
    createdAt datetime     not null,
    updatedAt datetime     not null,
    deletedAt datetime     null
);

create or replace table Items
(
    id          int auto_increment
        primary key,
    name        varchar(255)      not null,
    price       float             not null,
    isActive    tinyint default 1 null,
    units       int               not null,
    description text              not null,
    type        varchar(255)      not null,
    brand       varchar(255)      not null,
    pictureUrl  varchar(255)      null,
    createdAt   datetime          not null,
    updatedAt   datetime          not null,
    deletedAt   datetime          null
);

create or replace table Users
(
    id        int auto_increment
        primary key,
    username  varchar(255)      not null,
    email     varchar(255)      not null,
    fname     varchar(255)      not null,
    lname     varchar(255)      not null,
    type      tinyint default 0 null,
    createdAt datetime          not null,
    updatedAt datetime          not null,
    deletedAt datetime          null,
    constraint `unique`
        unique (email)
);

create or replace table CreditCards
(
    id        int auto_increment
        primary key,
    number    varchar(255) not null,
    userId    int          null,
    createdAt datetime     not null,
    updatedAt datetime     not null,
    deletedAt datetime     null,
    constraint CreditCards_ibfk_1
        foreign key (userId) references Users (id)
);

create or replace index userId
    on CreditCards (userId);

create or replace table Orders
(
    id           int auto_increment
        primary key,
    userId       int                                not null,
    status       varchar(255) default 'IN_PROGRESS' null,
    addressId    int                                not null,
    fname        varchar(255)                       not null,
    lname        varchar(255)                       not null,
    creditCardId int                                not null,
    createdAt    datetime                           not null,
    updatedAt    datetime                           not null,
    deletedAt    datetime                           null,
    constraint Orders_ibfk_1
        foreign key (userId) references Users (id),
    constraint Orders_ibfk_2
        foreign key (addressId) references Addresses (id),
    constraint Orders_ibfk_3
        foreign key (creditCardId) references CreditCards (id)
);

create or replace table OrderData
(
    id        int auto_increment
        primary key,
    orderId   int      null,
    itemId    int      null,
    units     int      not null,
    createdAt datetime not null,
    updatedAt datetime not null,
    deletedAt datetime null,
    constraint OrderData_ibfk_1
        foreign key (orderId) references Orders (id),
    constraint OrderData_ibfk_2
        foreign key (itemId) references Items (id)
);

create or replace index itemId
    on OrderData (itemId);

create or replace index orderId
    on OrderData (orderId);

create or replace index addressId
    on Orders (addressId);

create or replace index creditCardId
    on Orders (creditCardId);

create or replace index userId
    on Orders (userId);

create or replace table Passwords
(
    password  varchar(64) not null,
    userId    int         not null
        primary key,
    createdAt datetime    not null,
    updatedAt datetime    not null,
    deletedAt datetime    null,
    constraint `unique`
        unique (userId),
    constraint Passwords_ibfk_1
        foreign key (userId) references Users (id)
);

create or replace table ShoppingCarts
(
    id        int auto_increment
        primary key,
    userId    int      not null,
    itemId    int      not null,
    units     int      not null,
    createdAt datetime not null,
    updatedAt datetime not null,
    deletedAt datetime null,
    constraint ShoppingCarts_ibfk_1
        foreign key (userId) references Users (id),
    constraint ShoppingCarts_ibfk_2
        foreign key (itemId) references Items (id)
);

create or replace index itemId
    on ShoppingCarts (itemId);

create or replace index userId
    on ShoppingCarts (userId);

create or replace table VisitEvents
(
    id        int auto_increment
        primary key,
    ipAddress varchar(255) not null,
    time      time         not null,
    itemId    int          not null,
    eventType varchar(255) not null,
    createdAt datetime     not null,
    updatedAt datetime     not null,
    deletedAt datetime     null,
    constraint VisitEvents_ibfk_1
        foreign key (itemId) references Items (id)
);

create or replace index itemId
    on VisitEvents (itemId);



# INSERT INTO Addresses (STREET, PROVINCE, COUNTRY, ZIP, PHONE, CREATEDAT, UPDATEDAT)
# VALUES ('1234 Fun Times', 'Ontario', 'Canada', 'M5C 1H9', '416 543 9999', NOW(), NOW());

INSERT INTO Items (NAME, PRICE, UNITS, DESCRIPTION, TYPE, BRAND, PICTUREURL, CREATEDAT, UPDATEDAT)
VALUES ('Nintendo Switch OLED', 379.99, 100,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Console', 'Nintendo',
        'https://assets.nintendo.com/image/upload/ncom/en_US/switch/site-design-update/oled-model-promo-mobile', NOW(),
        NOW());
INSERT INTO Items (NAME, PRICE, UNITS, DESCRIPTION, TYPE, BRAND, PICTUREURL, CREATEDAT, UPDATEDAT)
VALUES ('PlayStation 5', 629.99, 100,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Console', 'Sony',
        'https://media.wired.com/photos/601dde27f1bf194f33695d95/3:4/w_1347,h_1796,c_limit/Gear-PS5-2-src-Sony-teal.jpg',
        NOW(), NOW());
INSERT INTO Items (NAME, PRICE, UNITS, DESCRIPTION, TYPE, BRAND, PICTUREURL, CREATEDAT, UPDATEDAT)
VALUES ('Xbox Series X', 599.99, 100,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Console', 'Microsoft', 'https://assets1.ignimgs.com/2019/12/13/xbox-series-x---button-01a-1576278376804.jpg',
        NOW(), NOW());
INSERT INTO Items (NAME, PRICE, UNITS, DESCRIPTION, TYPE, BRAND, PICTUREURL, CREATEDAT, UPDATEDAT)
VALUES ('Steam Deck', 499.99, 100,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Console', 'Steam',
        'https://media.wired.com/photos/6217e2ebe15f63f9560fa168/master/pass/Gear-Steam-Deck-Rendering-1.jpg', NOW(),
        NOW());

# INSERT INTO Users (USERNAME, EMAIL, TYPE, CREATEDAT, UPDATEDAT, FNAME, LNAME)
# VALUES ('admin', 'admin', 1, NOW(), NOW(), 'eric', 'marcantonio');

# INSERT INTO Passwords (userId, PASSWORD, CREATEDAT, UPDATEDAT)
# VALUES (1, 'password',
#         NOW(), NOW());

# INSERT INTO CreditCards (NUMBER, USERID, CREATEDAT, UPDATEDAT)
# VALUES ('123456789', 1, NOW(), NOW());

# INSERT INTO Orders (USERID, ADDRESSID, FNAME, LNAME, CREATEDAT, UPDATEDAT, CREDITCARDID)
# VALUES (1, 1, 'Eric', 'Marcantonio', NOW(), NOW(), 1);
#
#
# INSERT INTO OrderData (ORDERID, ITEMID, UNITS, CREATEDAT, UPDATEDAT)
# VALUES (1, 2, 6, NOW(), NOW());
# INSERT INTO OrderData (ORDERID, ITEMID, UNITS, CREATEDAT, UPDATEDAT)
# VALUES (1, 3, 44, NOW(), NOW());
# INSERT INTO OrderData (ORDERID, ITEMID, UNITS, CREATEDAT, UPDATEDAT)
# VALUES (1, 4, 22, NOW(), NOW());
# INSERT INTO OrderData (ORDERID, ITEMID, UNITS, CREATEDAT, UPDATEDAT)
# VALUES (1, 1, 24, NOW(), NOW());

# INSERT INTO ShoppingCarts (USERID, ITEMID, UNITS, CREATEDAT, UPDATEDAT)
# VALUES (1, 2, 39, NOW(), NOW());
# INSERT INTO ShoppingCarts (USERID, ITEMID, UNITS, CREATEDAT, UPDATEDAT)
# VALUES (1, 3, 3, NOW(), NOW());

DELIMITER $$;
CREATE OR REPLACE PROCEDURE CREATE_ORDER(
    IN USER_ID INT,
    IN ADDRESS_ID INT,
    IN FNAME_ARG TEXT,
    IN LNAME_ARG TEXT,
    IN CCID INT)
BEGIN


    set @NUMBEROFGOODITEMS = (select count(*)
                              from ShoppingCarts
                                       JOIN Items on Items.ID = ShoppingCarts.ITEMID
                              where Items.deletedAt is null
                                and ShoppingCarts.deletedAt is null
                                and ShoppingCarts.userId = USER_ID
                                and ShoppingCarts.units <= Items.units);

    SET @ITEMSINCART := (SELECT COUNT(*) FROM ShoppingCarts WHERE USERID = USER_ID and ShoppingCarts.deletedAt is null);

    IF (@ITEMSINCART = @NUMBEROFGOODITEMS and @ITEMSINCART > 0 and @NUMBEROFGOODITEMS > 0) THEN

        INSERT INTO Orders (USERID, ADDRESSID, FNAME, LNAME, CREATEDAT, UPDATEDAT, CREDITCARDID)
        VALUES (USER_ID, ADDRESS_ID, FNAME_ARG, LNAME_ARG, NOW(), NOW(), CCID);

        SET @LASTID = (SELECT LAST_INSERT_ID() FROM Orders limit 1);
        UPDATE Items JOIN ShoppingCarts ON Items.ID = ShoppingCarts.ITEMID
        SET Items.UNITS = Items.UNITS - ShoppingCarts.UNITS where ShoppingCarts.deletedAt is null;


        INSERT INTO OrderData (ORDERID, ITEMID, UNITS, CREATEDAT, UPDATEDAT)
        SELECT @LASTID, ITEMID, UNITS, NOW(), NOW()
        FROM ShoppingCarts
        WHERE USER_ID = USERID and ShoppingCarts.deletedAt is null;

        SELECT * FROM Orders WHERE USER_ID = USERID and id = @LASTID;
        UPDATE ShoppingCarts SET deletedAt = NOW() where userId = USER_ID and deletedAt is null;
    ELSE
        SELECT * from Orders where 1 = 0;
    END IF;
END $$;
DELIMITER ;

# CALL CREATE_ORDER(1, 1, 'eric', 'marc', 1)
