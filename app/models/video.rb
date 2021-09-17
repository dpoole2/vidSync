class Video < ApplicationRecord
    has_one_attached :file

    def get_chunk(count, last_segment)
        # For now only get the first chunk
        data_stream = self.file.download
        size = data_stream.length / 8
        # print data_stream.first(100).bytes
        # File size....
        # 552448
        math_end = size * count 
        math_start = size * (count - 1)
        self.save
        if math_end == data_stream.length
            puts "ENDING"
            return  data_stream[math_start, data_stream.length]
        else
            puts (math_start), ( math_end - 1)
            puts data_stream[(math_start)..(math_end - 1)].length
            return  data_stream[(math_start)..(math_end - 1)]
        end
       
    end

end
