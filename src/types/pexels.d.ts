type Quality = 'original' | 'large2x' | 'large';

type Src = {
  [ke in Quality]: string;
}

interface Response {
  src: Src;
  photographer: string;
  photographer_url: string;
}

interface Picture {
  src: string;
  authorUrl: string;
  authorName: string;
}

export { Response, Picture };
