class CreateVideos < ActiveRecord::Migration[6.1]
  def change
    create_table :videos do |t|
      t.string :name
      t.integer :count, :default => 0
      t.integer :party_id
      t.timestamps
    end
  end
end
