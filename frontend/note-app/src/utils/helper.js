export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};


export const initials = (name)=> {
    const nameParts = name.split(' ').filter(part => part.trim() !== '');
    const initials = nameParts.map(part => part[0].toUpperCase()).join('');

  return initials;
}