const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
})

// PAGES //

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, { // PAGE METHODS //

    hooks: {
        beforeValidate: function(page){
            console.log('beforeValidate Here')

            if (page.title) {
                page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '')
            }
            console.log(page)
        }
    },
    getterMethods: {
        route: function(){
            return '/wiki/' + this.urlTitle
        }
    },

});

// USERS //

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true
    }
});

module.exports = {
  Page: Page,
  User: User
};