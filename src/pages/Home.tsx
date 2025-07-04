import { useAuth } from '@/hooks/useAuth';

const Home = () => {
  const { me } = useAuth();
  console.log('me', me);

  return (
    <div className='space-y-4'>
      <h1 className='text-3xl font-bold'>Welcome</h1>
      <p>This is the home page of your application.</p>
    </div>
  );
};

export default Home;
