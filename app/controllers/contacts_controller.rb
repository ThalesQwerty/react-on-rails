class ContactsController < ApplicationController
  def index
    render json: Contact.all
  end

  def show
    contact = Contact.where(id: params[:id])[0]
    if contact
      render json: contact
    else
      render json: nil
    end
  end

  def create
    error = validate_input()
    
    unless error
      new_contact = Contact.create!(contact_info)
      if new_contact
        render json: { success: true, message: "New contact created successfully!", contact: new_contact }
      else
        render json: { success: false, message: "An unknown error has occured." }
      end
    else
      render json: { success: false, message: error }
    end
  end

  def update
    error = validate_input()

    unless error
      contact = Contact.where(id: params[:id])[0]
      if contact and contact.update_attributes!(contact_info)
        render json: { success: true, message: "Contact information updated successfully!", contact: contact }
      elsif not contact
        render json: { success: false, message: "Contact information not found." }
      else
        render json: { success: false, message: "An unknown error has occured." }
      end
    else
      render json: { success: false, message: error }
    end
  end
  
  def destroy
    contact = Contact.where(id: params[:id])[0]
    if contact and contact.destroy
      render json: { success: true, message: "Contact info deleted successfully!" }
    elsif not contact
      render json: { success: false, message: "Contact info not found." }
    else
      render json: { success: false, message: "An unknown error has occured." }
    end
  end

  private def contact_info
    params.permit(:id, :name, :phone)
  end

  private def validate_input
    params[:name] = params[:name] ? (params[:name].strip! or params[:name]) : params[:name]
    
    if not params[:name] or params[:name].to_s.length == 0
      return "You have to insert a name for the contact"

    elsif params[:name].to_s.length < 2
      return "Contact name must have at least 2 characters"

    elsif params[:name].to_s.length > 32
      return "Name cannot be greater than 32 characters"

    elsif not params[:phone] or params[:phone].to_s.length == 0
      return "You have to insert a phone number for the contact"

    elsif not params[:phone].to_s.match(/^\+\d{2}\s\d{2}\s\d{5}\-\d{4}$/)
      return "Invalid phone number!"

    else
      return nil
    end
  end
end
