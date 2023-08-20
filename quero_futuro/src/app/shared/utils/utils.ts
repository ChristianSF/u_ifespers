export function convertKebabToNormal(kebabCase: string) {
    const words = kebabCase.split('-');
    const normalizedWords = words.map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word;
      }
    });
    return normalizedWords.join(' ');
  }