# lib/jwt_helper.rb

module JwtHelper
  extend ActiveSupport::Concern

  # Secret key from .env
  JWT_SECRET = ENV["JWT_SECRET_KEY"]

  # Ensure ENV keys are read properly with newlines
  private_key_content = ENV["RSA_PRIVATE_KEY"]&.gsub("\\n", "\n")
  public_key_content = ENV["RSA_PUBLIC_KEY"]&.gsub("\\n", "\n")

  RSA_PRIVATE = OpenSSL::PKey::RSA.new(private_key_content) rescue nil
  RSA_PUBLIC = OpenSSL::PKey::RSA.new(public_key_content) rescue nil

  # Encode JWT token with expiration using RSA256
  def encode_token(payload)
    payload[:exp] = 24.hours.from_now.to_i
    payload[:hash] = Digest::SHA256.hexdigest(payload.to_json)
    JWT.encode(payload, RSA_PRIVATE, "RS256")
  end

  # Decode JWT token with signature verification using RSA256
  # def decode_token(token)
  #   begin
  #     decoded = JWT.decode(token, RSA_PUBLIC, true, { algorithm: "RS256" })[0]

  #     # Verify hash integrity
  #     expected_hash = Digest::SHA256.hexdigest(decoded.except("hash").to_json)
  #     if decoded["hash"] != expected_hash
  #      render json: { error: "Token payload tampered with!" }, status: :unauthorized
  #     end

  #     unless JWT.encode(decoded, RSA_PRIVATE, "RS256") == token
  #        render json: { error: "Token signature mismatch!" }, status: :unauthorized
  #     end

  #     HashWithIndifferentAccess.new(decoded)
  #   rescue JWT::VerificationError
  #     render json: { error: "Invalid token signature or payload" }, status: :unauthorized
  #   rescue JWT::DecodeError => e
  #     render json: { error: "JWT Decode Error: #{e.message}" }, status: :unauthorized
  #   end
  # end

  def decode_token(token)
    begin
      decoded = JWT.decode(token, RSA_PUBLIC, true, { algorithm: "RS256" })[0]

      # Verify hash integrity
      expected_hash = Digest::SHA256.hexdigest(decoded.except("hash").to_json)
      return nil if decoded["hash"] != expected_hash  # Return nil instead of rendering JSON

      return nil unless JWT.encode(decoded, RSA_PRIVATE, "RS256") == token  # Signature mismatch

      HashWithIndifferentAccess.new(decoded)
    rescue JWT::DecodeError, JWT::VerificationError => e
      nil  # Return nil instead of rendering JSON (fix for tests)
    end
  end


   # Expose methods so they can be called as JwtHelper.encode_token(...)
   module_function :encode_token, :decode_token
end
