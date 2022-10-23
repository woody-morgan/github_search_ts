export type withTypeChange<T> = { [P in keyof T & string as `${P}Change`]: T[P] };
