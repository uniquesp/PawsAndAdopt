require "test_helper"

class Api::V1::BreedsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_breeds_index_url
    assert_response :success
  end
end
