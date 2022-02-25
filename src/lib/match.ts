import anyMatch from 'anymatch'
import fs from 'fs'
import * as readline  from 'readline'

export interface MatcherProps {
  targetFile: string
  matchersFile: string
}

export class Matcher {
  props: MatcherProps

  constructor(props: MatcherProps) {
    this.props = props
  }

  async check(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      // const filePath: string = this.props.filePath
      const inStream = fs.createReadStream(this.props.targetFile);
      const rl = readline.createInterface( {input: inStream });
      const result: string[] = [];
      const matchers= fs.readFileSync(this.props.matchersFile, {encoding: 'utf-8'}).toString().split("\n").filter(x => x).map(x=> new RegExp(x));
      rl.on('line', function (line) {
        if (line && anyMatch(matchers, line)) {
          result.push(line)
        }
      });
      rl.on('close', function () {
          resolve(result)
      });
    })
  }
}
