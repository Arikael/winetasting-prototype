abstract class Mapper<TApi, TModel> {
    abstract MapFromApi(from: TApi): TModel;
    abstract MapToApi(from: TModel): TApi;
}
