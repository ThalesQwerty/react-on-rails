Rails.application.routes.draw do

  root 'main#index'

  scope '/api' do

    get 'contacts', to: 'contacts#index'

    get 'contacts/:id', to: 'contacts#show'

    get 'contacts/create', to: 'contacts#create'

    get 'contacts/update/:id', to: 'contacts#update'

    get 'contacts/delete/:id', to: 'contacts#destroy'

  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
