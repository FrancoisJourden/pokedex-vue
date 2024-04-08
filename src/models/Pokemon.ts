export interface Pokemon{
  id: number,
  name: string,
  sprites: Sprites
  types: Array<{slot: number, type: Type}>
  forms: Array<Form>
}

export interface Type{
  name: string,
  url: string
}

interface Sprites{
  back_default: string,
  back_female: string | null,
  back_shiny: string,
  back_shiny_female: string | null,
  front_default: string,
  front_female: string | null,
  front_shiny: string,
  front_shiny_female: string | null,
}

interface Form {
  name: string,
  url: string,
}