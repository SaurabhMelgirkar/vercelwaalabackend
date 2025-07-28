import React from 'react';
import PageTemplate from '../components/PageTemplate';

const AboutPage = () => {
  return (
    <PageTemplate
      title="About TEDx DYP Akurdi"
      subtitle="Discover the spirit behind our event"
    >
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="mb-6">
          TEDx DYP Akurdi is a local, independently organized event licensed by TED. Our mission is to foster
          dialogue, share ideas, and inspire innovation within our community and beyond. We bring together
          thinkers, doers, and dreamers to spark conversations that matter.
        </p>

        <h2 className="text-2xl font-bold mb-4">What is TEDx?</h2>
        <p className="mb-6">
          TEDx is a program of local, self-organized events that bring people together to share a TED-like
          experience. At a TEDx event, TED Talks video and live speakers combine to spark deep discussion and
          connection in a small group.
        </p>

        <h2 className="text-2xl font-bold mb-4">Our Team</h2>
        <p>
          Our team is composed of passionate students and faculty from Dr. D. Y. Patil Institute of Technology.
          We are committed to creating an inclusive, engaging, and memorable experience for all attendees.
        </p>
      </div>
    </PageTemplate>
  );
};

export default AboutPage;
