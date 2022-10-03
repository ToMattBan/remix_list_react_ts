function formatTime(length: number) {
  const minutes = Math.floor(length / 60);
  const seconds = Math.trunc(length - minutes * 60);

  return {
    minutes,
    seconds
  };
}

export default formatTime;
