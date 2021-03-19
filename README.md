# React on Rails!

Yes, it's possible.

This project is a simple contact list made using React and MaterialUI on the front-end, and Ruby on Rails on the back-end.

[Click here to check it out!](https://contacts-on-rails.herokuapp.com/)

## How to install and run the project locally

### System dependencies

First of all, you'll need to have Ruby on Rails and PostgreSQL installed on your computer.

- [Quick Ruby on Rails installer](http://railsinstaller.org/)
- [PostgreSQL download links](https://www.postgresql.org/download/)

You can verify if your Ruby on Rails instalation is fine by running:

```shell
ruby --version
rails --version
gem --version
bundle --version
```

And for PostgreSQL, you can verify your installation by running:

```shell
postgres --version
```

If all of the commands above work, then everything's set to go!

### Download and configuration

Open the terminal or command prompt in a folder of your preference, and clone this repository into your computer:

```shell
git clone https://github.com/ThalesQwerty/react-on-rails
cd react-on-rails
```

After that, install the dependencies:

```shell
bundle install
yarn install
```

In order to run React, you'll need to also install Webpacker:

```shell
bundle exec rails webpacker:install
bundle exec rails webpacker:install:react
```

Create a file named `local_env.yml` on the `/config` folder, and change the variables according to the user you've created on your PostgreSQL local installation:

```yml
REACT_ON_RAILS_DATABASE_HOST: "localhost"
REACT_ON_RAILS_DATABASE_PORT: "5432"
REACT_ON_RAILS_DATABASE_USERNAME: "[your_username_here]"
REACT_ON_RAILS_DATABASE_PASSWORD: "[your_password_here]"
REACT_ON_RAILS_DATABASE_DBNAME: "React_on_Rails_development"
```

The last step before finally running the project locally is to create a database on PostgreSQL. Luckily, Rails will do everything for you:

```shell
rails db:create
rails db:migrate
```
### Running the project

That's it! Now all you have to do is run:

```shell
rails s
```

Open your favorite browser on `localhost:3000`, and have fun!