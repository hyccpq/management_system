
interface Person {
	name: string;
	age: number;
}

let person: Person = {
	name: 'Jarid',
	age: 35
};

function pluck<T, K extends keyof T>(o: T, names: K): T[K] {
	return o[names];
}