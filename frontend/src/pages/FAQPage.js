import React, { useState } from "react";
import "../styles/faq-page.css";

const FAQPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: "Как я могу создать новую учетную запись?",
      answer:
        "Для создания новой учетной записи перейдите на страницу регистрации и заполните необходимую информацию",
    },
    {
      question: "Как сбросить пароль?",
      answer:
        "Вы можете сбросить пароль, перейдя на страницу восстановления пароля и следуя инструкциям",
    },
    {
      question: "Как связаться с поддержкой?",
      answer:
        "Чтобы связаться с нашей службой поддержки, отправьте нам электронное письмо на aibolit34@gmail.com или позвоните по телефону +123456789",
    },
  ];

  const handleToggle = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <main>
      <section className="faq-page">
        <div className="container">
          <div className="faq-page__inner">
            <h1 className="faq-title">Часто задаваемые вопросы</h1>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h2 className="faq-item__title" onClick={() => handleToggle(index)}>{faq.question}</h2>
                  {expandedIndex === index && <p className="faq-item__text">{faq.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQPage;