import Link from 'next/link';
import ReduxProviderRegistry from '~lib/registry/redux';
import NotificationBar from '~components/NotificationBar';
import Resume from '~components/Resume';

const Page = () => {
  return (
    <ReduxProviderRegistry>
      <NotificationBar>
        <p>
          Currently looking for a job.{' '}
          <Link
            href="mailto:mrbartrns@gmail.com"
            style={{ fontWeight: 'bold', textDecoration: 'underline' }}
          >
            Email
          </Link>{' '}
          me if you want to know more about me.
        </p>
      </NotificationBar>
      {/** first part of main page, introduction */}
      <Resume />
    </ReduxProviderRegistry>
  );
};

export default Page;
