import React from 'react';

interface ContactInfoItem {
  icon: string;
  title: string;
  desc: string | React.ReactNode;
}

interface ContactInfoProps {
  infoItems?: ContactInfoItem[];
}

const DEFAULT_INFO: ContactInfoItem[] = [
  {
    icon: 'location_on',
    title: 'Address',
    desc: '236 5th SE Avenue, New York NY10000, United States',
  },
  {
    icon: 'phone',
    title: 'Phone',
    desc: (
      <>
        Mobile: +(84) 546-6789
        <br />
        Hotline: +(84) 456-6789
      </>
    ),
  },
  {
    icon: 'access_time',
    title: 'Working Time',
    desc: (
      <>
        Monday-Friday: 9:00 - 22:00
        <br />
        Saturday-Sunday: 9:00 - 21:00
      </>
    ),
  },
];

const ContactInfo: React.FC<ContactInfoProps> = ({ infoItems = DEFAULT_INFO }) => {
  const currentInfo = infoItems.length > 0 ? infoItems : DEFAULT_INFO;

  return (
    <div className="space-y-12">
      {currentInfo.map((item) => (
        <div key={item.title} className="flex items-start group">
          <span className="material-icons-outlined text-3xl mr-6 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
            {item.icon}
          </span>
          <div>
            <h3 className="text-xl font-bold dark:text-white mb-2">{item.title}</h3>
            <p className="text-gray-500 dark:text-gray-400">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
