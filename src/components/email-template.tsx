
export interface EmailTemplateProps {
  firstName: string;
  cuerpo: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
    // esto es lo que se va a convertir en el correo (plantilla del correo)
  firstName,
  cuerpo,
}): JSX.Element => {
  
  return (
     <div>
    <h1>Welcome, {firstName}!</h1>
    <p>{cuerpo}</p>
  </div>
  )
 
};

