Rails.application.routes.draw do

  root 'main#index'

  scope '/api' do

    get 'contacts', to: 'contacts#index'

    get 'contacts/:id', to: 'contacts#show'

    post 'contacts', to: 'contacts#create'

    post 'contacts/:id', to: 'contacts#update'

    delete 'contacts/:id', to: 'contacts#destroy'

  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
