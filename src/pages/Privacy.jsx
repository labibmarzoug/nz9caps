import { site } from '../data/site'

export default function Privacy() {
  return (
    <div className="page legal-page wrap">
      <div className="page-hero">
        <span className="kicker">Legal</span>
        <h1>Privacy policy</h1>
      </div>
      <p>Last updated: October 2, 2026</p>
      <p>
        {site.name} operates this store and website, including all related information, content, features, tools, products and
        services, in order to provide you, the customer, with a curated shopping experience (the &quot;Services&quot;). This Privacy
        Policy describes how we collect, use, and disclose your personal information when you visit, use, or make a purchase
        or other transaction using the Services or otherwise communicate with us.
      </p>
      <p>
        Please read this Privacy Policy carefully. By using and accessing any of the Services, you acknowledge that you have
        read this Privacy Policy and understand the collection, use, and disclosure of your information as described in this
        Privacy Policy.
      </p>
      <h2>Personal Information We Collect or Process</h2>
      <p>
        When we use the term &quot;personal information,&quot; we are referring to information that identifies or can reasonably be
        linked to you or another person. We may collect or process the following categories of personal information,
        depending on how you interact with the Services:
      </p>
      <ul>
        <li>Contact details including your name, address, billing address, shipping address, phone number, and email address.</li>
        <li>Financial information including payment method, transaction details, form of payment and payment confirmation.</li>
        <li>Account information including your username, password, preferences and settings.</li>
        <li>Transaction information including the items you view, put in your cart, or purchase, return, exchange or cancel.</li>
        <li>Communications with us including customer support inquiries.</li>
        <li>Device information including information about your device, browser, or network connection and IP address.</li>
        <li>Usage information including how and when you interact with or navigate the Services.</li>
      </ul>
      <h2>How We Use Your Personal Information</h2>
      <p>
        We use your personal information to provide, tailor and improve the Services, process payments, fulfill orders,
        arrange shipping, communicate with you, prevent fraud, and comply with legal obligations. We may also use it for
        marketing and promotional communications. You may opt out of promotional emails at any time.
      </p>
      <h2>How We Disclose Personal Information</h2>
      <p>
        We may disclose personal information to vendors who perform services on our behalf (payment processing, fulfillment
        and shipping, IT and customer support), with business partners when you request it, or when required by law.
      </p>
      <h2>Children&apos;s Data</h2>
      <p>
        The Services are not intended to be used by children, and we do not knowingly collect any personal information about
        children under the age of majority in your jurisdiction.
      </p>
      <h2>Security and Retention</h2>
      <p>
        No security measures are perfect or impenetrable. How long we retain your personal information depends on whether we
        need it to maintain your account, provide the Services, comply with legal obligations, resolve disputes or enforce
        contracts and policies.
      </p>
      <h2>Your Rights and Choices</h2>
      <p>
        Depending on where you live, you may have rights to access, delete, correct, or receive a copy of personal
        information we hold about you. You may exercise these rights by contacting us using the details below.
      </p>
      <h2>International Transfers</h2>
      <p>Please note that we may transfer, store and process your personal information outside the country you live in.</p>
      <h2>Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will post the revised Privacy Policy on this website and
        update the &quot;Last updated&quot; date.
      </p>
      <h2>Contact</h2>
      <p>
        Should you have any questions about our privacy practices or this Privacy Policy, please email us at {site.email} or
        contact us at {site.address}.
      </p>
    </div>
  )
}
