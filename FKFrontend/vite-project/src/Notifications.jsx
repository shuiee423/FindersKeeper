import React, { useEffect, useState } from 'react';

function Notifications({ onNavigate, userSchoolId }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`http://localhost/notification.php?schoolId=${userSchoolId}`);
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userSchoolId]);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-300">
          Notifications
        </h2>
        <button
          onClick={() => onNavigate('home')}
          className="text-5xl font-extrabold text-gray-500 hover:text-yellow-600"
          title="Close"
        >
          ×
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      ) : notifications.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No notifications at the moment.
        </p>
      ) : (
        notifications.map((note, index) => (
          <div
            key={index}
            className="border border-green-400 bg-green-50 dark:bg-gray-700 p-5 rounded-lg text-green-700 dark:text-green-300 mb-4"
          >
            <h3 className="text-lg font-bold mb-2">
              Claim Request {note.status === 'accepted' ? 'Approved' : 'Rejected'}
            </h3>

            {note.status === 'accepted' ? (
              <p className="mb-2">
                You may now retrieve the item at:
                <br />
                <strong>Building 21 - Guard House</strong>
              </p>
            ) : (
              <p className="mb-2 text-red-600 dark:text-red-400">
                Unfortunately, your claim request was rejected.
              </p>
            )}

            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
              {note.message}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Notifications;