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
    new_contact = Contact.create!(contact_info)
    if new_contact
      render json: { success: true, message: "Contact info created successfully!", contact: new_contact }
    else
      render json: { success: false, message: "An error has occured." }
    end
  end

  def destroy
    contact = Contact.where(id: params[:id])[0]
    if contact and contact.destroy
      render json: { success: true, message: "Contact info deleted successfully!" }
    elsif not contact
      render json: { success: false, message: "Contact info not found." }
    else
      render json: { success: false, message: "An error has occured." }
    end
  end

  def update
    contact = Contact.where(id: params[:id])[0]
    if contact and contact.update_attributes!(contact_info)
      render json: { success: true, message: "Contact info updated successfully!", contact: contact }
    elsif not contact
      render json: { success: false, message: "Contact info not found." }
    else
      render json: { success: false, message: "An error has occured." }
    end
  end

  private def contact_info
    params.permit(:id, :name, :phone)
  end
end
