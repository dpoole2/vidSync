class PartiesController < ApplicationController
  before_action :set_party, only: %i[ show ]

  def show
  end

  def join
    @parties = Party.all
  end

  # GET /parties/new
  def new
    @party = Party.new
  end

  # POST /parties or /parties.json
  def create
    @party = Party.new(party_params)

    respond_to do |format|
      if @party.save
        format.html { redirect_to video_path(@party.video), notice: "Party was successfully created." }
        format.json { render :show, status: :created, location: @party }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @party.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_party
      @party = Party.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def party_params
      params.fetch(:party, {}).permit(:name, :video_id, :yt_video_id)
    end
end
