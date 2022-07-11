import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { IRouterState } from '../models';

export class CustomRouterSerializer
  implements RouterStateSerializer<IRouterState>
{
  /**
   * @description
   * Custom router serializer. As per @ngrx documentation it is used because router state snapshot is a mutable object
   * and that can cause issue with store freeze.
   * @param { RouterStateSnapshot } routerState
   * @returns { IRouterState }
   */
  serialize(routerState: RouterStateSnapshot): IRouterState {
    let route = routerState.root;
    const pathFromRoot: string[] = [];

    while (route.firstChild) {
      route = route.firstChild;

      const urlSegment = route.url;

      if (urlSegment && urlSegment.length > 0) {
        pathFromRoot.push(urlSegment[0].path);
      }
    }

    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return {
      url,
      params,
      pathFromRoot,
      queryParams,
    };
  }
}
