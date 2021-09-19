class Party < ApplicationRecord
    has_one :video
    after_save :download_video

    def download_video
        YoutubeDL.download "https://www.youtube.com/watch?v=#{self.yt_video_id}", output: "tmp/#{self.name}.mp4"
        video = Video.create(name: "Dylan's Video!", party_id: self.id)
        # Fragment video before saving it...
        system("mp4fragment tmp/#{self.name}.mp4 tmp/#{self.name}_fragged.mp4")
        video.file.attach(io: File.open("tmp/#{self.name}_fragged.mp4"), filename: "#{self.name}.mp4")
        # Clean up directory...
        File.delete("tmp/#{self.name}.mp4") if File.exist?("tmp/#{self.name}.mp4")
        File.delete("tmp/#{self.name}_fragged.mp4") if File.exist?("tmp/#{self.name}_fragged.mp4")
    end

end
