export interface Specie{
  id: number,
  name: string,
  varieties: Variety[]
}

export interface Variety{
  is_default: boolean,
  pokemon: Pokemon
}

interface Pokemon{
  name: string,
  url: string,
}