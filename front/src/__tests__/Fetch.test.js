// Check that the appropriate info is being fetched from back end
test('real fetch call', async () => {
    const res = await fetch('/users/branwaddy');
    const result = await res.json();
    expect(result[0].login).toBe('branwaddy');
  });