export default function AdminDashboard() {
  return (
    <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Use the navigation bar above to manage your site settings and page content.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
        {/* Card 1 */}
        <div className="bg-white overflow-hidden shadow-sm rounded-lg ring-1 ring-gray-900/5">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <span className="material-symbols-outlined text-indigo-600">settings</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Global Config</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">Site Settings</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
            <div className="text-sm">
              <a href="/admin/settings" className="font-medium text-indigo-600 hover:text-indigo-900">Edit Settings &rarr;</a>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white overflow-hidden shadow-sm rounded-lg ring-1 ring-gray-900/5">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <span className="material-symbols-outlined text-indigo-600">article</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Content</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">Manage Pages</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
            <div className="text-sm">
              <a href="/admin/pages" className="font-medium text-indigo-600 hover:text-indigo-900">View All Pages &rarr;</a>
            </div>
          </div>
        </div>

        {/* Card 3 - Bookings */}
        <div className="bg-white overflow-hidden shadow-sm rounded-lg ring-1 ring-gray-900/5">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <span className="material-symbols-outlined text-indigo-600">calendar_month</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Reservations</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">Bookings</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
            <div className="text-sm">
              <a href="/admin/bookings" className="font-medium text-indigo-600 hover:text-indigo-900">Manage Bookings &rarr;</a>
            </div>
          </div>
        </div>

        {/* Card 4 - Users */}
        <div className="bg-white overflow-hidden shadow-sm rounded-lg ring-1 ring-gray-900/5">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <span className="material-symbols-outlined text-indigo-600">group</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Customers</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">Users & Dogs</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
            <div className="text-sm">
              <a href="/admin/users" className="font-medium text-indigo-600 hover:text-indigo-900">View Users &rarr;</a>
            </div>
          </div>
        </div>

        {/* Card 5 - Enquiries */}
        <div className="bg-white overflow-hidden shadow-sm rounded-lg ring-1 ring-gray-900/5">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <span className="material-symbols-outlined text-indigo-600">mail</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Messages</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">Enquiries</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
            <div className="text-sm">
              <a href="/admin/enquiries" className="font-medium text-indigo-600 hover:text-indigo-900">View Enquiries &rarr;</a>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
