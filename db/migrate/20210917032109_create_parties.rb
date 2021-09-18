class CreateParties < ActiveRecord::Migration[6.1]
  def change
    create_table :parties do |t|
      t.string :yt_video_id
      t.bigint :video_id
      t.string :name
      t.timestamps
    end
  end
end
