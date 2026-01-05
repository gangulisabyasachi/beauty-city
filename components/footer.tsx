export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Apart.</h3>
            <p className="text-sm opacity-90">Your community, your home.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="hover:text-secondary">
                  About Us
                </a>
              </li>
              <li>
                <a href="/assets" className="hover:text-secondary">
                  Assets
                </a>
              </li>
              <li>
                <a href="/events" className="hover:text-secondary">
                  Events
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-sm">Email: info@apartment.com</p>
            <p className="text-sm">Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="border-t border-primary-foreground opacity-30 pt-8 text-center text-sm">
          <p>&copy; 2025 Apartment Community. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
