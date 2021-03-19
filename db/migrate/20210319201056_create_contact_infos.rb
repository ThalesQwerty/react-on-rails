class CreateContactInfos < ActiveRecord::Migration[5.1]
  def change
    create_table :contact_infos do |t|
      t.string :contact_type
      t.string :value

      t.belongs_to :contact, index: true

      t.timestamps
    end
  end
end
