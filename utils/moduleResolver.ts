import type { IApi } from '@umijs/types';
import fs from 'fs';
import path from 'path';
import slash from 'slash2';
import resolve from 'enhanced-resolve';
// import ctx from '../context';
const ctx: { umi?: IApi; opts?: any } = {};

const DEFAULT_EXT = ['.tsx', '.jsx', '.js', '.ts'];

interface IModuleResolverOpts {
  basePath: string;
  sourcePath: string;
  extensions?: string[];
  silent?: boolean;
}

/**
 * resolve module path base on umi context (alias)
 */
export const getModuleResolvePath = ({
  basePath,
  sourcePath,
  extensions = DEFAULT_EXT,
  silent,
}: IModuleResolverOpts) => {
  // treat local packages as 3rd-party module for collect as dependencies
  if (/^[a-z]@/.test(sourcePath) && getHostPkgPath(getPkgPathsFromPath(sourcePath).pkgName)) {
    return slash(path.join(ctx.umi.paths.absNodeModulesPath, sourcePath));
  }

  try {
    return slash(
      resolve.create.sync({
        extensions,
        alias: ctx.umi?.config?.alias,
        symlinks: false,
        mainFiles: ['index', 'package.json'],
      })(fs.statSync(basePath).isDirectory() ? basePath : path.parse(basePath).dir, sourcePath),
    );
  } catch (err) {
    if (!silent) {
      ctx.umi?.logger.error(`[dumi]: cannot resolve module ${sourcePath} from ${basePath}`);
    }

    throw err;
  }
};
