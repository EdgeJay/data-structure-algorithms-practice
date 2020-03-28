interface Foo {
  bar: string;
}

const someFunc = (): Foo => {
  const foo: Foo = {
    bar: 'baz',
  };
  return foo;
};

console.log(someFunc());
