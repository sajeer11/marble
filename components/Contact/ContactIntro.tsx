import React from 'react';

interface ContactIntroProps {
  title?: string;
  description?: string;
}

const ContactIntro: React.FC<ContactIntroProps> = ({
  title = 'Get In Touch With Us',
  description = 'For more information about our premium marble products & services, please feel free to drop us an email. Our staff will always be there to help you out. Do not hesitate!'
}) => {
  return (
    <div className="text-center mb-20">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ContactIntro;
