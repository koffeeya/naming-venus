var ghpages = require('gh-pages');
require('dotenv').config()

ghpages.publish(
    'public',
    {
        branch: 'gh-pages',
        silent: true,
        repo: 'https://' + process.env.GITHUB_TOKEN + '@github.com/koffeeya/naming-venus.git',
        user: {
            name: 'Kavya Beheraj',
            email: 'kavya.beheraj@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)