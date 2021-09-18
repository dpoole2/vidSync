class Video < ApplicationRecord
    has_one_attached :file
    belongs_to :party

    def get_chunk(count, last_segment)
        data_stream = self.file.download
        size = data_stream.length / 2
        math_end = size * count 
        math_start = size * (count - 1)
        if math_end == data_stream.length
            puts "ENDING"
            return  data_stream#[math_start, data_stream.length]
        else
            return  data_stream#[(math_start)..(math_end - 1)]
        end
    end

end
