import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E4D3E7] p-4">
      <Card className="w-full max-w-3xl bg-white shadow-lg rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-[#8A5691] text-3xl font-bold">About Us</CardTitle>
          <p className="text-gray-600 mt-1">We'd love to hear from you!</p>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#8A5691]">PetHouse Information</h2>
            <p className="text-gray-700 mt-2">
              PetHouse is dedicated to providing shelter, adoption, and care for animals in need. Our mission is to connect loving pets with caring families.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#8A5691]">Contact Details</h2>
            <p className="text-gray-700 mt-1"><strong>Email:</strong> pawsandadopt@gmail.com</p>
            <p className="text-gray-700 mt-1"><strong>Phone:</strong> +91 98765 43210</p>
            <p className="text-gray-700 mt-1"><strong>Address:</strong> 123 Pet Street, Pune, Maharashtra, India</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
