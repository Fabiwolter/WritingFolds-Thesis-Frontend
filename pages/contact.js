import Layout from '../components/Layout'
import ContactForm from '../components/form/contactForm'

const Contact = () => {
	return (
		<Layout>
			<div className="row">
				<div className="col md-12">
					<h2>Contact Form</h2>
				</div>
			</div>
			<div className="row">
				<ContactForm/>
			</div>


		</Layout>
	)
}

export default Contact;