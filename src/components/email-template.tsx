
interface EmailTemplateProps {
  firstName: string;
  cuerpo: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    // esto es lo que se va a convertir en el correo (plantilla del correo)
  firstName,
  cuerpo,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>{cuerpo}</p>
    <button>
        <a href="http://localhost:3000">button</a>
    </button>
  </div>
);
