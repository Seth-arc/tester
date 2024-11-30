export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process the form data
    const formData = req.body;
    
    // Here you would typically save the data to a database
    // For now, we'll just log it and send a response
    console.log('Received form data:', formData);

    res.status(200).json({ message: 'Form submitted successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

