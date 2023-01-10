const ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/koffeeya/naming-venus.git', // Update to point to your repository  
        user: {
            name: 'Kavya Beheraj', // update to use your name
            email: 'kavya.beheraj@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)