class CreateChats < ActiveRecord::Migration[6.1]
  def change
    create_table :chats do |t|
      t.string :message
      t.bigint :party_id
      t.timestamps
    end
  end
end
