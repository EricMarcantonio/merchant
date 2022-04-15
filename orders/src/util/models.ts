import {DataTypes} from "sequelize";
import {db} from "./index";
import {ERRORS} from './responses'

const AddressModel = db.define("Address", {
    street: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.STREET_NULL.toString()
            },
        }
    },
    province: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.PROVINCE_NULL.toString()
            },
        }
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.COUNTRY_NULL.toString()
            },
        }
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.ZIP_NULL.toString()
            },
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.PHONE_NULL.toString()
            },
        }
    },
}, {
    deletedAt: true,
    timestamps: true,
    paranoid: true
})


const UserModel = db.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.USERNAME_NULL.toString()
            },
            isAlphanumeric: {
                msg: 'Please enter letters and numbers only for your username.'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            name: 'unique',
            msg: ERRORS.EMAIL_NOT_UNIQUE.toString()
        },
        validate: {
            notNull: {
                msg: ERRORS.EMAIL_NULL.toString()
            },
            isEmail: {
                msg: 'Please enter a valid email.'
            }
        }
    },
    fname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.FIRST_NAME_NULL.toString()
            },
            isAlpha: {
                msg: 'Please enter letters only for your first name.'
            },
        }
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.LAST_NAME_NULL.toString()
            },
            isAlpha: {
                msg: 'Please enter letters only for your last name.'
            },
        }
    },
    type: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    }
}, {
    deletedAt: true,
    timestamps: true,
    paranoid: true
})

const CreditCardModel = db.define("CreditCard", {
    number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.CREDIT_CARD_NUMBER_NULL.toString()
            },
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: UserModel,
            key: 'id'
        }
    }
}, {
    deletedAt: true,
    timestamps: true,
    paranoid: true
})

const OrderModel = db.define("Order", {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: UserModel,
            key: 'id'
        },
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.USER_ID_NULL.toString()
            },
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'IN_PROGRESS',
    },
    addressId: {
        type: DataTypes.INTEGER,
        references: {
            model: AddressModel,
            key: "id"
        },
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.ADDRESS_ID_NULL.toString()
            },
        }
    },
    fname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.FIRST_NAME_NULL.toString()
            },
        }
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.LAST_NAME_NULL.toString()
            },
        }
    },
    creditCardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CreditCardModel,
            key: "id"
        },
        validate: {
            notNull: {
                msg: ERRORS.CREDIT_CARD_ID_NULL.toString()
            },
        }
    }
}, {
    deletedAt: true,
    timestamps: true,
    paranoid: true
})


const ItemModel = db.define("Item", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.ITEM_NAME_NULL.toString()
            },
        }
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.PRICE_NULL.toString()
            },
        }
    },
    isActive: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
    },
    units: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.UNITS_NULL.toString()
            },
        }
    },
    description: {
        type: DataTypes.TEXT,
        dialectTypes: 'LONG',
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.DESCRIPTION_NULL.toString()
            },
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.TYPE_NULL.toString()
            },
        }
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.BRAND_NULL.toString()
            },
        }
    },
    pictureUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    deletedAt: true,
    timestamps: true,
    paranoid: true
})


const OrderDataModel = db.define("OrderData", {
    orderId: {
        type: DataTypes.INTEGER,
        references: {
            model: OrderModel,
            key: 'id'
        }
    },
    itemId: {
        type: DataTypes.INTEGER,
        references: {
            model: ItemModel,
            key: "id"
        }
    },
    units: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.ORDER_UNITS_NULL.toString()
            },
        }
    }
}, {
    deletedAt: true,
    timestamps: true,
    paranoid: true
})

const PasswordModel = db.define("Password", {
    password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.PASSWORD_IS_NULL.toString()
            },
            is: /^[0-9a-f]{64}$/i
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        unique: {
            name: 'unique',
            msg: ERRORS.USER_ID_NOT_UNIQUE.toString()
        },
        references: {
            model: UserModel,
            key: "id"
        },
        primaryKey: true
    }
}, {
    deletedAt: true,
    timestamps: true,
    paranoid: true
})

const ShoppingCartModel = db.define("ShoppingCart", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: "id"
        },
        validate: {
            notNull: {
                msg: ERRORS.USER_ID_NULL.toString()
            },
        }
    },
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ItemModel,
            key: "id"
        },
        validate: {
            notNull: {
                msg: ERRORS.ITEM_ID_NULL.toString()
            }
        }
    },
    units: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.UNITS_NULL.toString()
            },
        }
    },
}, {
    deletedAt: true,
    timestamps: true,
    paranoid: true
})

const VisitEventModel = db.define("VisitEvent", {
    ipAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.IP_ADDRESS_NULL.toString()
            },
        }
    },
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ItemModel,
            key: "id"
        },
        validate: {
            notNull: {
                msg: ERRORS.ITEM_ID_NULL.toString()
            },
        }
    },
    eventType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    }
}, {
    deletedAt: true,
    timestamps: true,
    paranoid: true
})


const ReviewsModel = db.define("Review", {
    // id: {
    //     primaryKey: true,
    //     autoIncrement: true,
    //     type: DataTypes.INTEGER
    // },

    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ItemModel,
            key: "id"
        },
        validate: {
            notNull: {
                msg: ERRORS.ITEM_ID_NULL.toString()
            },
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: "id"
        },
        validate: {
            notNull: {
                msg: ERRORS.USER_ID_NULL.toString()
            },
        }
    },
    data: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.DESCRIPTION_NULL.toString()
            },
        }
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: ERRORS.DESCRIPTION_NULL.toString()
            },
        }
    }

}, {
    deletedAt: true,
    timestamps: true,
    paranoid: true
})


export {
    AddressModel,
    CreditCardModel,
    ItemModel,
    OrderDataModel,
    OrderModel,
    UserModel,
    PasswordModel,
    VisitEventModel,
    ShoppingCartModel,
    ReviewsModel
}